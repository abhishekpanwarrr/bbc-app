// import { create } from "zustand";

// type Item = {
//   id: string;
//   name: string;
//   price: number;
// };

// type CartState = {
//   items: Item[];
//   addItem: (item: Item) => void;
//   total: number;
// };

// export const useCart = create<CartState>((set, get) => ({
//   items: [],
//   total: 0,
//   addItem: (item) =>
//     set((state) => ({
//       items: [...state.items, item],
//       total: state.total + item.price,
//     })),
// }));

import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: Item[];
  addItem: (item: Omit<Item, "qty">) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  total: number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
          total: state.total + item.price,
        };
      }

      return {
        items: [...state.items, { ...item, qty: 1 }],
        total: state.total + item.price,
      };
    }),

  increaseQty: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id)!;
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i
        ),
        total: state.total + item.price,
      };
    }),

  decreaseQty: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id)!;
      if (item.qty === 1) {
        return {
          items: state.items.filter((i) => i.id !== id),
          total: state.total - item.price,
        };
      }

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        ),
        total: state.total - item.price,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id)!;
      return {
        items: state.items.filter((i) => i.id !== id),
        total: state.total - item.price * item.qty,
      };
    }),
}));
