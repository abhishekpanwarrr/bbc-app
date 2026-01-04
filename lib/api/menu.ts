// import { useAuthStore } from "@/store/authStore";
// import { apiFetch } from "./client";

// export interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string | null;
//   isAvailable: boolean;
//   categoryId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface MenuCategory {
//   id: string;
//   name: string;
//   order: number;
//   imageUrl?: string;
//   createdAt: string;
//   updatedAt: string;
//   items?: MenuItem[];
// }

// export interface MenuCategoryWithItems {
//   id: string;
//   name: string;
//   imageUrl?: string | null;
//   order: number;
//   items: MenuItem[];
// }

// export type MenuResponse = MenuCategory[];
// export interface MenuItemWithCategory extends MenuItem {
//   category?: {
//     id: string;
//     name: string;
//   };
// }
// export async function getMenu(): Promise<MenuResponse> {
//   const token = useAuthStore.getState().token;

//   return apiFetch("/menu", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

// export async function getMenuItemsByCategory(categoryId: string): Promise<MenuCategoryWithItems> {
//   const token = useAuthStore.getState().token;

//   return apiFetch(`/menu/category/${categoryId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

// export async function getFeaturedItems(): Promise<MenuItem[]> {
//   return apiFetch("/menu/featured", {
//     method: "GET",
//   });
// }

import { useAuthStore } from "@/store/authStore";
import { apiFetch } from "./client";

/* =========================
   TYPES
========================= */

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

export interface MenuItemWithCategory extends MenuItem {
  category?: {
    id: string;
    name: string;
  };
}

/* =========================
   IN-MEMORY CACHE (IMPORTANT)
========================= */

// ✅ Item-level cache to avoid refetch + flicker
export const itemCache = new Map<string, MenuItemWithCategory>();

/* =========================
   API FUNCTIONS
========================= */

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

export async function getFeaturedItems(): Promise<MenuItem[]> {
  return apiFetch("/menu/featured", {
    method: "GET",
  });
}

/* =========================
   ITEM FETCH (CACHED)
========================= */

export async function getMenuItemById(id: string): Promise<MenuItemWithCategory> {
  return apiFetch(`/menu/item/${id}`, {
    method: "GET",
  });
}

export async function getMenuItemByIdCached(id: string): Promise<MenuItemWithCategory> {
  // ✅ Serve from cache if available
  if (itemCache.has(id)) {
    return itemCache.get(id)!;
  }

  // ❄️ Cold fetch
  const item = await getMenuItemById(id);
  itemCache.set(id, item);
  return item;
}
