import { supabase } from "./supabase";

// Updated interface to match Supabase schema
export interface Experiment {
  id: number;
  slug: string;
  name: string;
  url?: string | null;
  tagline: string;
  description: string;
  category: string;
  vertical: string;
  tags?: string[] | null;
  status: string;
  traction_score?: number | null;
  waitlist_count?: number | null;
  created_at: string;
  pricing_model?: string | null;
  // Adding icon for compatibility with existing UI
  icon?: string;
}

// Map status values to display values for backward compatibility
function mapStatus(status: string): "beta" | "coming-soon" {
  switch (status.toLowerCase()) {
    case "beta":
    case "live":
      return "beta";
    case "coming-soon":
    case "development":
    case "planned":
      return "coming-soon";
    default:
      return "coming-soon";
  }
}

// Generate icon from category/name for fallback
function generateIcon(name: string, category: string): string {
  const iconMap: Record<string, string> = {
    'quoting': '🎤',
    'invoice': '📄', 
    'documentation': '📋',
    'workflow': '⚙️',
    'analytics': '📊',
    'communication': '💬',
    'automation': '🤖',
    'productivity': '📈'
  };
  
  const categoryLower = category.toLowerCase();
  const nameLower = name.toLowerCase();
  
  // Try to match by category first
  for (const [key, icon] of Object.entries(iconMap)) {
    if (categoryLower.includes(key) || nameLower.includes(key)) {
      return icon;
    }
  }
  
  // Default fallback
  return '🚀';
}

export async function getExperiments(): Promise<Experiment[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .neq('status', 'killed')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching experiments:', error);
      return [];
    }
    
    // Map data and add icons for UI compatibility
    return (data || []).map((product) => ({
      ...product,
      status: mapStatus(product.status),
      icon: generateIcon(product.name, product.category)
    }));
  } catch (error) {
    console.error('Error fetching experiments:', error);
    return [];
  }
}

export async function getExperiment(slug: string): Promise<Experiment | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .neq('status', 'killed')
      .single();
    
    if (error || !data) {
      console.error('Error fetching experiment:', error);
      return undefined;
    }
    
    return {
      ...data,
      status: mapStatus(data.status),
      icon: generateIcon(data.name, data.category)
    };
  } catch (error) {
    console.error('Error fetching experiment:', error);
    return undefined;
  }
}
