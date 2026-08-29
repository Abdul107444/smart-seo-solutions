import { LeadSubmission } from '../types';

/**
 * Supabase Client Bridge
 * 
 * This module is prepared to connect directly to Supabase table `fiverr_optimization_leads`.
 * When Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are provided,
 * submissions will automatically push to your Supabase PostgreSQL table.
 * 
 * Local persistence (localStorage) is always active as a secure fallback.
 */

const STORAGE_KEY = 'smart_seo_fiverr_leads';

export async function saveLeadSubmission(lead: Omit<LeadSubmission, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: LeadSubmission; error?: string }> {
  const newSubmission: LeadSubmission = {
    ...lead,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };

  try {
    // 1. Save to LocalStorage for zero-loss fallback
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existingList: LeadSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));

    // 2. Check if Supabase is configured via environment variables
    const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
    const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/fiverr_optimization_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            full_name: newSubmission.fullName,
            email: newSubmission.email || null,
            whatsapp: newSubmission.whatsapp,
            fiverr_profile_url: newSubmission.fiverrProfileUrl || null,
            fiverr_gig_url: newSubmission.fiverrGigUrl || null,
            niche: newSubmission.niche,
            improvement_goal: newSubmission.improvementGoal || null,
            active_gigs_count: newSubmission.activeGigsCount || null,
            current_orders_status: newSubmission.currentOrdersStatus || null,
            interested_services: newSubmission.interestedServices || [],
            created_at: newSubmission.createdAt,
          }),
        });

        if (!response.ok) {
          console.warn('Supabase insert note:', response.statusText);
        }
      } catch (err) {
        console.warn('Supabase fetch notice (fallback used):', err);
      }
    }

    return { success: true, data: newSubmission };
  } catch (err: any) {
    console.error('Error saving lead submission:', err);
    return { success: false, error: err?.message || 'Failed to save submission' };
  }
}

export function getStoredSubmissions(): LeadSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
