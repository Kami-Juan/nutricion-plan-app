export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      daily_nutrient_summary: {
        Row: {
          created_at: string | null
          id: string
          nutrient_type: string
          nutrition_plan_id: string
          total_portions: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          nutrient_type: string
          nutrition_plan_id: string
          total_portions: number
        }
        Update: {
          created_at?: string | null
          id?: string
          nutrient_type?: string
          nutrition_plan_id?: string
          total_portions?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_nutrient_summary_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      dishes: {
        Row: {
          created_at: string | null
          dish_order: number
          id: string
          image_url: string | null
          meal_period_id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          dish_order: number
          id?: string
          image_url?: string | null
          meal_period_id: string
          title: string
        }
        Update: {
          created_at?: string | null
          dish_order?: number
          id?: string
          image_url?: string | null
          meal_period_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "dishes_meal_period_id_fkey"
            columns: ["meal_period_id"]
            isOneToOne: false
            referencedRelation: "meal_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          created_at: string | null
          dish_id: string
          id: string
          ingredient_order: number
          name: string
        }
        Insert: {
          created_at?: string | null
          dish_id: string
          id?: string
          ingredient_order: number
          name: string
        }
        Update: {
          created_at?: string | null
          dish_id?: string
          id?: string
          ingredient_order?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "dishes"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_period_equivalents: {
        Row: {
          created_at: string | null
          group_code: string
          id: string
          meal_period_id: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          group_code: string
          id?: string
          meal_period_id: string
          quantity: number
        }
        Update: {
          created_at?: string | null
          group_code?: string
          id?: string
          meal_period_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_period_equivalents_meal_period_id_fkey"
            columns: ["meal_period_id"]
            isOneToOne: false
            referencedRelation: "meal_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_periods: {
        Row: {
          created_at: string | null
          id: string
          nutrition_plan_id: string
          period_name: string
          period_order: number
          period_time: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nutrition_plan_id: string
          period_name: string
          period_order: number
          period_time?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nutrition_plan_id?: string
          period_name?: string
          period_order?: number
          period_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_periods_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_plans: {
        Row: {
          created_at: string | null
          id: string
          plan_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_menu: {
        Args: { p_date: string }
        Returns: {
          dish_image: string
          dish_title: string
          ingredients: string[]
          period_name: string
          period_order: number
        }[]
      }
      get_nutrient_summary: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: {
          avg_daily_portions: number
          days_count: number
          nutrient_type: string
          total_portions: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
