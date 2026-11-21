import { createClient } from "@/lib/supabase/client";
import {
  mockCategories,
  mockSystemTypes,
  mockPlatforms,
  mockLocalSystems,
} from "@/lib/data/mock-data";
import type {
  Category,
  SystemType,
  Platform,
  LocalSystem,
  SearchResult,
} from "@/types/database";

export const REVALIDATE_INTERVAL = 3600; // 1 hour ISR

// 1. Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // fallback to mock
  }
  return mockCategories;
}

// 2. Counts for animated Hero stats
export async function getCounts(): Promise<{
  systemTypes: number;
  platforms: number;
  localSystems: number;
}> {
  try {
    const supabase = createClient();
    const [stRes, pRes, lsRes] = await Promise.all([
      supabase.from("system_types").select("id", { count: "exact", head: true }),
      supabase.from("platforms").select("id", { count: "exact", head: true }),
      supabase.from("local_systems").select("id", { count: "exact", head: true }),
    ]);

    return {
      systemTypes: stRes.count || mockSystemTypes.length,
      platforms: pRes.count || mockPlatforms.length,
      localSystems: lsRes.count || mockLocalSystems.length,
    };
  } catch {
    return {
      systemTypes: mockSystemTypes.length,
      platforms: mockPlatforms.length,
      localSystems: mockLocalSystems.length,
    };
  }
}

// 3. System Types
export async function getSystemTypes(categorySlug?: string): Promise<SystemType[]> {
  let list = mockSystemTypes;
  try {
    const supabase = createClient();
    let query = supabase.from("system_types").select("*, category:categories(*)");
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      list = data as unknown as SystemType[];
    }
  } catch {
    // fallback
  }

  if (categorySlug && categorySlug !== "all") {
    return list.filter((item) => item.category?.slug === categorySlug);
  }
  return list;
}

export async function getSystemTypeBySlug(slug: string): Promise<SystemType | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("system_types")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return data as unknown as SystemType;
    }
  } catch {
    // fallback
  }

  const found = mockSystemTypes.find((s) => s.slug === slug);
  return found || null;
}

// 4. Platforms
export async function getPlatforms(categorySlug?: string): Promise<Platform[]> {
  let list = mockPlatforms;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("platforms")
      .select("*, category:categories(*)");

    if (!error && data && data.length > 0) {
      list = data as unknown as Platform[];
    }
  } catch {
    // fallback
  }

  if (categorySlug && categorySlug !== "all") {
    return list.filter((p) => p.category?.slug === categorySlug);
  }
  return list;
}

export async function getPlatformBySlug(slug: string): Promise<Platform | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("platforms")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return data as unknown as Platform;
    }
  } catch {
    // fallback
  }

  const found = mockPlatforms.find((p) => p.slug === slug);
  return found || null;
}

export async function getPlatformsBySlugs(slugs: string[]): Promise<Platform[]> {
  const all = await getPlatforms();
  return all.filter((p) => slugs.includes(p.slug));
}

// 5. Local Systems
export async function getLocalSystems(): Promise<LocalSystem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("local_systems").select("*");

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // fallback
  }
  return mockLocalSystems;
}

export async function getLocalSystemBySlug(slug: string): Promise<LocalSystem | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("local_systems")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // fallback
  }

  const found = mockLocalSystems.find((l) => l.slug === slug);
  return found || null;
}

// 6. Global Search RPC / Fallback
export async function searchAll(query: string): Promise<SearchResult[]> {
  if (!query || !query.trim()) return [];
  const cleanQ = query.trim().toLowerCase();

  try {
    const supabase = createClient();
    const rpcClient = supabase as unknown as {
      rpc: (
        fn: "search_all",
        args: { q: string }
      ) => Promise<{ data: SearchResult[] | null; error: unknown }>;
    };
    const { data, error } = await rpcClient.rpc("search_all", { q: cleanQ });
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // fallback
  }

  // In-memory fallback search
  const results: SearchResult[] = [];

  // Search system types
  mockSystemTypes.forEach((st) => {
    if (
      st.abbr.toLowerCase().includes(cleanQ) ||
      st.full_name_en.toLowerCase().includes(cleanQ) ||
      st.description_uz.toLowerCase().includes(cleanQ) ||
      st.definition_uz.toLowerCase().includes(cleanQ)
    ) {
      results.push({
        result_type: "system_type",
        id: st.id,
        slug: st.slug,
        title: st.abbr,
        subtitle: st.full_name_en,
        description: st.description_uz,
        category: st.category?.name_uz || "Tizim turi",
      });
    }
  });

  // Search platforms
  mockPlatforms.forEach((p) => {
    if (
      p.name.toLowerCase().includes(cleanQ) ||
      p.full_name.toLowerCase().includes(cleanQ) ||
      p.description_uz.toLowerCase().includes(cleanQ) ||
      p.audience_uz.toLowerCase().includes(cleanQ)
    ) {
      results.push({
        result_type: "platform",
        id: p.id,
        slug: p.slug,
        title: p.name,
        subtitle: p.full_name,
        description: p.description_uz,
        category: p.category?.name_uz || "Platforma",
      });
    }
  });

  // Search local systems
  mockLocalSystems.forEach((ls) => {
    if (
      ls.name.toLowerCase().includes(cleanQ) ||
      ls.description_uz.toLowerCase().includes(cleanQ) ||
      ls.use_case_tags.some((t) => t.toLowerCase().includes(cleanQ))
    ) {
      results.push({
        result_type: "local_system",
        id: ls.id,
        slug: ls.slug,
        title: ls.name,
        subtitle: "O‘zbekiston yechimi",
        description: ls.description_uz,
        category: ls.use_case_tags.join(", "),
      });
    }
  });

  return results;
}
