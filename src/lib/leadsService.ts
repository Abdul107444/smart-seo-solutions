import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { LeadSubmission, LeadStatus } from '../types';

const LEADS_COLLECTION = 'leads';
const LOCAL_STORAGE_KEY = 'smart_seo_fiverr_leads_v2';
const SYNC_CHANNEL_NAME = 'smart_seo_leads_channel';

// Helper to get local leads cache safely with backward compatibility
export function getLocalLeads(): LeadSubmission[] {
  try {
    let leads: LeadSubmission[] = [];
    const rawV2 = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (Array.isArray(parsed)) leads = parsed;
    }

    // Check previous storage key for any existing leads
    const rawOld = localStorage.getItem('smart_seo_fiverr_leads');
    if (rawOld) {
      const parsedOld = JSON.parse(rawOld);
      if (Array.isArray(parsedOld) && parsedOld.length > 0) {
        leads = mergeLeads(leads, parsedOld);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
      }
    }

    return leads;
  } catch (e) {
    console.warn('Error reading local leads:', e);
    return [];
  }
}

// Helper to save leads cache and notify all tabs
export function setLocalLeads(leads: LeadSubmission[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
    // Broadcast change to other open windows/tabs in real-time
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({ type: 'LEADS_UPDATED', timestamp: Date.now() });
        channel.close();
      } catch {}
    }
  } catch (e) {
    console.warn('Error saving local leads:', e);
  }
}

// Deduplicate and merge lists preserving latest status & notes
function mergeLeads(primary: LeadSubmission[], secondary: LeadSubmission[]): LeadSubmission[] {
  const map = new Map<string, LeadSubmission>();

  // Helper key generator
  const getKey = (item: LeadSubmission) => {
    if (item.id && !item.id.startsWith('local_')) return item.id;
    return `${item.whatsapp.replace(/\D/g, '')}_${item.createdAt.slice(0, 16)}`;
  };

  // Add all secondary
  for (const item of secondary) {
    map.set(getKey(item), item);
  }

  // Add all primary (overwriting with primary if newer/present)
  for (const item of primary) {
    const key = getKey(item);
    if (map.has(key)) {
      const existing = map.get(key)!;
      map.set(key, {
        ...existing,
        ...item,
        status: item.status || existing.status || 'new',
        notes: item.notes !== undefined ? item.notes : (existing.notes || ''),
        updatedAt: item.updatedAt || existing.updatedAt || item.createdAt
      });
    } else {
      map.set(key, item);
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Save customer submission with instant local guarantee + Firestore cloud persistence
 */
export async function saveLeadToFirestore(
  lead: Omit<LeadSubmission, 'id' | 'createdAt'>
): Promise<{ success: boolean; data?: LeadSubmission; id?: string; error?: string }> {
  const timestamp = new Date().toISOString();
  const temporaryId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  
  const leadData: LeadSubmission = {
    ...lead,
    id: temporaryId,
    status: lead.status || 'new',
    notes: lead.notes || '',
    price: lead.price || 'Rs. 8,000',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  // 1. Immediately store in persistent local cache so it is NEVER lost
  try {
    const currentLeads = getLocalLeads();
    const updated = [leadData, ...currentLeads.filter(l => l.id !== leadData.id)];
    setLocalLeads(updated);
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // 2. Persist to Firebase Firestore
  try {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
      fullName: leadData.fullName,
      whatsapp: leadData.whatsapp,
      niche: leadData.niche,
      fiverrProfileUrl: leadData.fiverrProfileUrl || '',
      fiverrGigUrl: leadData.fiverrGigUrl || '',
      email: leadData.email || '',
      improvementGoal: leadData.improvementGoal || '',
      activeGigsCount: leadData.activeGigsCount || '',
      currentOrdersStatus: leadData.currentOrdersStatus || '',
      interestedServices: leadData.interestedServices || [],
      paymentMethod: leadData.paymentMethod || '',
      paymentScreenshot: leadData.paymentScreenshot || '',
      transactionId: leadData.transactionId || '',
      status: leadData.status,
      notes: leadData.notes,
      price: leadData.price,
      createdAt: leadData.createdAt,
      updatedAt: leadData.updatedAt,
      serverTime: serverTimestamp()
    });

    const finalRecord: LeadSubmission = {
      ...leadData,
      id: docRef.id
    };

    // Update local cache with real Firestore document ID
    const currentLeads = getLocalLeads();
    const replaced = currentLeads.map(l => l.id === temporaryId ? finalRecord : l);
    setLocalLeads(replaced);

    return {
      success: true,
      id: docRef.id,
      data: finalRecord
    };
  } catch (error: any) {
    console.warn('Firestore cloud save notice (fallback stored locally):', error?.message);
    return {
      success: true,
      data: leadData,
      id: temporaryId,
      error: error?.message
    };
  }
}

/**
 * Real-time subscription to leads collection with persistent offline and cross-tab sync
 */
export function subscribeToLeads(
  onData: (leads: LeadSubmission[]) => void,
  onError?: (err: Error) => void
): () => void {
  // 1. Instantly return locally stored leads so page refresh has ZERO delay or data loss
  const initialLocal = getLocalLeads();
  onData(initialLocal);

  let isUnsubscribed = false;

  // 2. Listen to cross-tab updates (when lead is submitted on another tab)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY && !isUnsubscribed) {
      onData(getLocalLeads());
    }
  };
  window.addEventListener('storage', handleStorageChange);

  let broadcastChannel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      broadcastChannel.onmessage = () => {
        if (!isUnsubscribed) {
          onData(getLocalLeads());
        }
      };
    } catch {}
  }

  // 3. Connect to Firestore real-time onSnapshot
  try {
    const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));

    const firestoreUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (isUnsubscribed) return;

        const firestoreLeads: LeadSubmission[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Omit<LeadSubmission, 'id'>;
          firestoreLeads.push({
            ...data,
            id: docSnap.id,
          });
        });

        // Merge with existing local storage leads so nothing is ever dropped
        const currentLocal = getLocalLeads();
        const merged = mergeLeads(firestoreLeads, currentLocal);
        
        // Update local cache
        setLocalLeads(merged);
        onData(merged);
      },
      (error) => {
        console.warn('Firestore subscription fallback (using local persistent storage):', error?.message);
        if (onError) onError(error);
        if (!isUnsubscribed) {
          onData(getLocalLeads());
        }
      }
    );

    return () => {
      isUnsubscribed = true;
      window.removeEventListener('storage', handleStorageChange);
      if (broadcastChannel) broadcastChannel.close();
      firestoreUnsubscribe();
    };
  } catch (error: any) {
    console.warn('Error setting up Firestore snapshot, relying on local sync:', error);
    return () => {
      isUnsubscribed = true;
      window.removeEventListener('storage', handleStorageChange);
      if (broadcastChannel) broadcastChannel.close();
    };
  }
}

/**
 * Update lead status in both local cache and Firestore
 */
export async function updateLeadStatusInFirestore(
  leadId: string,
  newStatus: LeadStatus
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  // Update local cache immediately
  const localLeads = getLocalLeads();
  const updated = localLeads.map(lead => {
    if (lead.id === leadId) {
      return { ...lead, status: newStatus, updatedAt: timestamp };
    }
    return lead;
  });
  setLocalLeads(updated);

  // Sync to Firestore if not a purely local ID
  if (!leadId.startsWith('lead_')) {
    try {
      const docRef = doc(db, LEADS_COLLECTION, leadId);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: timestamp
      });
      return true;
    } catch (error) {
      console.warn('Error updating Firestore doc status:', error);
      return false;
    }
  }

  return true;
}

/**
 * Update lead notes in both local cache and Firestore
 */
export async function updateLeadNotesInFirestore(
  leadId: string,
  notes: string
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  // Update local cache immediately
  const localLeads = getLocalLeads();
  const updated = localLeads.map(lead => {
    if (lead.id === leadId) {
      return { ...lead, notes, updatedAt: timestamp };
    }
    return lead;
  });
  setLocalLeads(updated);

  // Sync to Firestore
  if (!leadId.startsWith('lead_')) {
    try {
      const docRef = doc(db, LEADS_COLLECTION, leadId);
      await updateDoc(docRef, {
        notes,
        updatedAt: timestamp
      });
      return true;
    } catch (error) {
      console.warn('Error updating Firestore doc notes:', error);
      return false;
    }
  }

  return true;
}

/**
 * Update lead payment info and screenshot in both local cache and Firestore
 */
export async function updateLeadPaymentInFirestore(
  leadId: string,
  paymentData: {
    paymentMethod?: string;
    transactionId?: string;
    paymentScreenshot?: string;
    price?: string;
  }
): Promise<boolean> {
  const timestamp = new Date().toISOString();

  // Update local cache immediately
  const localLeads = getLocalLeads();
  const updated = localLeads.map((lead) => {
    if (lead.id === leadId) {
      return {
        ...lead,
        ...paymentData,
        updatedAt: timestamp,
      };
    }
    return lead;
  });
  setLocalLeads(updated);

  // Sync to Firestore
  if (!leadId.startsWith('lead_')) {
    try {
      const docRef = doc(db, LEADS_COLLECTION, leadId);
      await updateDoc(docRef, {
        ...paymentData,
        updatedAt: timestamp,
      });
      return true;
    } catch (error) {
      console.warn('Error updating Firestore doc payment:', error);
      return false;
    }
  }

  return true;
}

/**
 * Delete a lead from both local cache and Firestore
 */
export async function deleteLeadFromFirestore(leadId: string): Promise<boolean> {
  // Remove from local cache immediately
  const localLeads = getLocalLeads();
  const filtered = localLeads.filter(lead => lead.id !== leadId);
  setLocalLeads(filtered);

  // Remove from Firestore
  if (!leadId.startsWith('lead_')) {
    try {
      const docRef = doc(db, LEADS_COLLECTION, leadId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.warn('Error deleting Firestore document:', error);
      return false;
    }
  }

  return true;
}
