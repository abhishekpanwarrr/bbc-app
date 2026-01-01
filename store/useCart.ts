// import { load } from "@/lib/storage";
// import { create } from "zustand";

// type Item = {
//   id: string;
//   name: string;
//   price: number;
//   qty: number;
// };

// type CartState = {
//   items: Item[];
//   addItem: (item: Omit<Item, "qty">) => void;
//   removeItem: (id: string) => void;
//   increaseQty: (id: string) => void;
//   decreaseQty: (id: string) => void;
//   total: number;
// };
// const persisted = load("cart", { items: [], total: 0 });

// export const useCart = create<CartState>((set, get) => ({
//   ...persisted,

//   addItem: (item) =>
//     set((state) => {
//       const existing = state.items.find((i) => i.id === item.id);
//       if (existing) {
//         return {
//           items: state.items.map((i) =>
//             i.id === item.id ? { ...i, qty: i.qty + 1 } : i
//           ),
//           total: state.total + item.price,
//         };
//       }

//       return {
//         items: [...state.items, { ...item, qty: 1 }],
//         total: state.total + item.price,
//       };
//     }),

//   increaseQty: (id) =>
//     set((state) => {
//       const item = state.items.find((i) => i.id === id)!;
//       return {
//         items: state.items.map((i) =>
//           i.id === id ? { ...i, qty: i.qty + 1 } : i
//         ),
//         total: state.total + item.price,
//       };
//     }),

//   decreaseQty: (id) =>
//     set((state) => {
//       const item = state.items.find((i) => i.id === id)!;
//       if (item.qty === 1) {
//         return {
//           items: state.items.filter((i) => i.id !== id),
//           total: state.total - item.price,
//         };
//       }

//       return {
//         items: state.items.map((i) =>
//           i.id === id ? { ...i, qty: i.qty - 1 } : i
//         ),
//         total: state.total - item.price,
//       };
//     }),

//   removeItem: (id) =>
//     set((state) => {
//       const item = state.items.find((i) => i.id === id)!;
//       return {
//         items: state.items.filter((i) => i.id !== id),
//         total: state.total - item.price * item.qty,
//       };
//     }),
// }));

import { load, save } from "@/lib/storage";
import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: Item[];
  total: number;
  addItem: (item: Omit<Item, "qty">) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
};

const persisted = load<CartState>("cart", {
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
});

export const useCart = create<CartState>((set) => ({
  items: persisted.items,
  total: persisted.total,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let updated: CartState;

      if (existing) {
        updated = {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
          total: state.total + item.price,
        };
      } else {
        updated = {
          ...state,
          items: [...state.items, { ...item, qty: 1 }],
          total: state.total + item.price,
        };
      }

      save("cart", updated);
      return updated;
    }),

  increaseQty: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      const updated = {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i
        ),
        total: state.total + item.price,
      };

      save("cart", updated);
      return updated;
    }),

  decreaseQty: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      let updated: CartState;

      if (item.qty === 1) {
        updated = {
          ...state,
          items: state.items.filter((i) => i.id !== id),
          total: state.total - item.price,
        };
      } else {
        updated = {
          ...state,
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty - 1 } : i
          ),
          total: state.total - item.price,
        };
      }

      save("cart", updated);
      return updated;
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      const updated = {
        ...state,
        items: state.items.filter((i) => i.id !== id),
        total: state.total - item.price * item.qty,
      };

      save("cart", updated);
      return updated;
    }),
}));
