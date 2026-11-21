export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PricingModel = 'free' | 'freemium' | 'subscription' | 'one_time' | 'custom';
export type DeploymentType = 'cloud' | 'onprem' | 'hybrid';

export interface Category {
  id: string;
  slug: string;
  name_uz: string;
  sort_order: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SystemType {
  id: string;
  slug: string;
  abbr: string;
  full_name_en: string;
  description_uz: string;
  definition_uz: string;
  when_needed_uz: string;
  key_features: string[];
  category_id: string | null;
  category?: Category | null;
  icon: string | null;
  related_ids: string[];
  faq: FAQItem[];
  created_at: string;
}

export interface Platform {
  id: string;
  slug: string;
  name: string;
  full_name: string;
  description_uz: string;
  audience_uz: string;
  pricing_model: PricingModel;
  deployment: DeploymentType;
  integrations: string[];
  local_support: boolean;
  website_url: string | null;
  category_id: string | null;
  category?: Category | null;
  system_type_ids: string[];
  created_at: string;
}

export interface LocalSystem {
  id: string;
  slug: string;
  name: string;
  description_uz: string;
  use_case_tags: string[];
  official_url: string | null;
  platform_type_ids: string[];
  created_at: string;
}

export interface SearchResult {
  result_type: 'system_type' | 'platform' | 'local_system';
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id'> & { id?: string };
        Update: Partial<Category>;
        Relationships: [];
      };
      system_types: {
        Row: SystemType;
        Insert: Omit<SystemType, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<SystemType>;
        Relationships: [
          {
            foreignKeyName: "system_types_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      platforms: {
        Row: Platform;
        Insert: Omit<Platform, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Platform>;
        Relationships: [];
      };
      local_systems: {
        Row: LocalSystem;
        Insert: Omit<LocalSystem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<LocalSystem>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      search_all: {
        Args: {
          q: string;
          [key: string]: unknown;
        };
        Returns: SearchResult[];
      };
    };
    Enums: {
      pricing_model_type: PricingModel;
      deployment_type: DeploymentType;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
