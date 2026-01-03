import { useAuthStore } from "@/store/authStore";
import { apiFetch } from "./client";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  items?: MenuItem[];
}

export interface MenuCategoryWithItems {
  id: string;
  name: string;
  imageUrl?: string | null;
  order: number;
  items: MenuItem[];
}

export type MenuResponse = MenuCategory[];

export async function getMenu(): Promise<MenuResponse> {
  const token = useAuthStore.getState().token;

  return apiFetch("/menu", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMenuItemsByCategory(categoryId: string): Promise<MenuCategoryWithItems> {
  const token = useAuthStore.getState().token;

  return apiFetch(`/menu/category/${categoryId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
