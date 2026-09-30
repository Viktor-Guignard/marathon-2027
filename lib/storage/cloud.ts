'use client';
import { createClient } from '@supabase/supabase-js';
import type { AppData } from '@/types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const cloudConfigured = Boolean(url && anonKey);
export const supabase = cloudConfigured ? createClient(url!, anonKey!) : null;

export async function loadCloudData(userId: string): Promise<AppData | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('user_data').select('payload').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data?.payload as AppData | null;
}

export async function saveCloudData(userId: string, payload: AppData) {
  if (!supabase) return;
  const { error } = await supabase.from('user_data').upsert({ user_id: userId, payload, updated_at: new Date().toISOString() });
  if (error) throw error;
}
