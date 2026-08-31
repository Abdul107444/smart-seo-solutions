import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { LeadSubmission, LeadStatus } from '../types';

const LEADS_COLLECTION = 'leads';
const LOCAL_STORAGE_KEY = 'smart_seo_fiverr_leads';

/**
 * Save customer submission to Firebase Firestore with LocalStorage cache fallback.
 */
export async function saveLeadToFirestore(
  lead: Omit<LeadSubmission, 'id' | 'createdAt'>
): Promise<{ success: boolean; data?: LeadSubmission; id?: string; error?: string }> {
  const timestamp = new Date().toISOString();
  
  const leadData: LeadSubmission = {
    ...lead,
    status: lead.status || 'new',
    notes: lead.notes || '',
    price: lead.price || 'Rs. 10,000',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    // 1. Always update local storage for instant offline resilience
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingList: LeadSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
      existingList.unshift(leadData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingList));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // 2. Save directly to Firebase Firestore
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
      status: leadData.status,
      notes: leadData.notes,
      price: leadData.price,
      createdAt: leadData.createdAt,
      updatedAt: leadData.updatedAt,
      serverTime: serverTimestamp()
    });

    const savedRecord: LeadSubmission = {
      ...leadData,
      id: docRef.id
    };

    return {
      success: true,
      id: docRef.id,
      data: savedRecord
    };
  } catch (error: any) {
    console.error('Firestore saveLead error:', error);
    // If Firestore fails, the local storage record already exists as backup
    return {
      success: true,
      data: {
        ...leadData,
        id: 'local_' + Date.now()
      },
      error: error?.message
    };
  }
}

/**
 * Real-time subscription to leads collection in Firestore
 */
export function subscribeToLeads(
  onData: (leads: LeadSubmission[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const leads: LeadSubmission[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Omit<LeadSubmission, 'id'>;
          leads.push({
            ...data,
            id: docSnap.id,
          });
        });

        // Also merge any local-only leads if any exist and aren't in Firestore yet
        try {
          const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (localRaw) {
            const localList: LeadSubmission[] = JSON.parse(localRaw);
            localList.forEach((localItem) => {
              if (localItem.id?.startsWith('local_') && !leads.some(l => l.whatsapp === localItem.whatsapp && l.createdAt === localItem.createdAt)) {
                leads.push(localItem);
              }
            });
          }
        } catch (e) {
          // ignore local storage parse errors
        }

        onData(leads);
      },
      (error) => {
        // Log clean info notice and seamlessly load cached records
        try {
          const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (localRaw) {
            onData(JSON.parse(localRaw));
          } else {
            onData([]);
          }
        } catch {}
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error: any) {
    console.error('Error establishing Firestore subscription:', error);
    if (onError) onError(error);
    return () => {};
  }
}

/**
 * Update lead status in Firestore
 */
export async function updateLeadStatusInFirestore(
  leadId: string,
  newStatus: LeadStatus
): Promise<boolean> {
  if (leadId.startsWith('local_')) {
    updateLocalLead(leadId, { status: newStatus });
    return true;
  }

  try {
    const docRef = doc(db, LEADS_COLLECTION, leadId);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating lead status in Firestore:', error);
    return false;
  }
}

/**
 * Update lead notes in Firestore
 */
export async function updateLeadNotesInFirestore(
  leadId: string,
  notes: string
): Promise<boolean> {
  if (leadId.startsWith('local_')) {
    updateLocalLead(leadId, { notes });
    return true;
  }

  try {
    const docRef = doc(db, LEADS_COLLECTION, leadId);
    await updateDoc(docRef, {
      notes,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating lead notes in Firestore:', error);
    return false;
  }
}

/**
 * Delete a lead from Firestore
 */
export async function deleteLeadFromFirestore(leadId: string): Promise<boolean> {
  if (leadId.startsWith('local_')) {
    deleteLocalLead(leadId);
    return true;
  }

  try {
    const docRef = doc(db, LEADS_COLLECTION, leadId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting lead from Firestore:', error);
    return false;
  }
}

function updateLocalLead(id: string, updates: Partial<LeadSubmission>) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const list: LeadSubmission[] = JSON.parse(raw);
    const idx = list.findIndex(item => item.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
  } catch {}
}

function deleteLocalLead(id: string) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const list: LeadSubmission[] = JSON.parse(raw);
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch {}
}
