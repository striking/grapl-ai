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

// Fallback data for build time when Supabase might not be available
const fallbackExperiments: Experiment[] = [
  {
    id: 1,
    slug: "quotemate",
    name: "QuoteMate", 
    tagline: "Voice to Quote in Minutes",
    description: "Speak your job details, get a professional quote. Built for tradies who hate paperwork.",
    category: "quoting",
    vertical: "construction",
    status: "beta",
    created_at: new Date().toISOString(),
    icon: "🎤"
  },
  {
    id: 2,
    slug: "invoice-scanner",
    name: "Invoice Scanner",
    tagline: "Snap. Extract. Done.", 
    description: "Take a photo of any invoice, get structured data instantly. No more manual entry.",
    category: "invoice",
    vertical: "accounting",
    status: "coming-soon",
    created_at: new Date().toISOString(),
    icon: "📄"
  },
  {
    id: 3,
    slug: "site-diary",
    name: "Site Diary",
    tagline: "Voice Notes That Organize Themselves",
    description: "Record site updates on the go. AI organizes them into daily reports automatically.", 
    category: "documentation",
    vertical: "construction",
    status: "coming-soon",
    created_at: new Date().toISOString(),
    icon: "📋"
  }
];

export async function getExperiments(): Promise<Experiment[]> {
  // Check if we're in a build environment or if Supabase vars are missing
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
    // In production build, try Supabase but fall back gracefully
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('status', 'killed')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase error during build, using fallback:', error);
        return fallbackExperiments;
      }
      
      // Map data and add icons for UI compatibility
      return (data || []).map((product) => ({
        ...product,
        status: mapStatus(product.status),
        icon: generateIcon(product.name, product.category)
      }));
    } catch (error) {
      console.warn('Supabase connection failed during build, using fallback:', error);
      return fallbackExperiments;
    }
  } else {
    // In dev or runtime, fail fast if there are issues
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('status', 'killed')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching experiments:', error);
        return fallbackExperiments;
      }
      
      // Map data and add icons for UI compatibility
      return (data || []).map((product) => ({
        ...product,
        status: mapStatus(product.status),
        icon: generateIcon(product.name, product.category)
      }));
    } catch (error) {
      console.error('Error fetching experiments:', error);
      return fallbackExperiments;
    }
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
      console.warn('Error fetching experiment:', error);
      // Fallback to finding in fallback data
      const fallback = fallbackExperiments.find(e => e.slug === slug);
      return fallback;
    }
    
    return {
      ...data,
      status: mapStatus(data.status),
      icon: generateIcon(data.name, data.category)
    };
  } catch (error) {
    console.warn('Error fetching experiment:', error);
    // Fallback to finding in fallback data
    const fallback = fallbackExperiments.find(e => e.slug === slug);
    return fallback;
  }
}
