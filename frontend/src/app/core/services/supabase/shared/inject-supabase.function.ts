
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
export const injectSupabase = () => {
    const supabaseService = inject(SupabaseService);
    return supabaseService.supabase;
}