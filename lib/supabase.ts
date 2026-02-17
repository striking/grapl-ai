import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          slug: string
          name: string
          url: string | null
          tagline: string
          description: string
          category: string
          vertical: string
          tags: string[] | null
          status: string
          traction_score: number | null
          waitlist_count: number | null
          created_at: string
          pricing_model: string | null
        }
        Insert: {
          id?: number
          slug: string
          name: string
          url?: string | null
          tagline: string
          description: string
          category: string
          vertical: string
          tags?: string[] | null
          status: string
          traction_score?: number | null
          waitlist_count?: number | null
          created_at?: string
          pricing_model?: string | null
        }
        Update: {
          id?: number
          slug?: string
          name?: string
          url?: string | null
          tagline?: string
          description?: string
          category?: string
          vertical?: string
          tags?: string[] | null
          status?: string
          traction_score?: number | null
          waitlist_count?: number | null
          created_at?: string
          pricing_model?: string | null
        }
      }
    }
  }
}