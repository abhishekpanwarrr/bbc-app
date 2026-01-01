// import { load, save } from "@/lib/storage";

// const persisted = load("loyalty", { stamps: 0, totalStamps: 10 });

// export const useLoyalty = create<LoyaltyState>((set) => ({
//   ...persisted,

//   addStamp: () =>
//     set((state) => {
//       const updated = {
//         ...state,
//         stamps: Math.min(state.stamps + 1, state.totalStamps),
//       };
//       save("loyalty", updated);
//       return updated;
//     }),

//   redeem: () => {
//     const reset = { stamps: 0, totalStamps: 10 };
//     save("loyalty", reset);
//     return reset;
//   },
// }));

import { load, save } from "@/lib/storage";
import { create } from "zustand";

type LoyaltyState = {
  stamps: number;
  totalStamps: number;
  addStamp: () => void;
  redeem: () => void;
};

const persisted = load<LoyaltyState>("loyalty", {
  stamps: 0,
  totalStamps: 10,
  addStamp: () => {},
  redeem: () => {},
});

export const useLoyalty = create<LoyaltyState>((set) => ({
  stamps: persisted.stamps,
  totalStamps: persisted.totalStamps,

  addStamp: () =>
    set((state) => {
      const updated = {
        ...state,
        stamps: Math.min(state.stamps + 1, state.totalStamps),
      };
      save("loyalty", updated);
      return updated;
    }),

  redeem: () =>
    set((state) => {
      const reset = { ...state, stamps: 0 };
      save("loyalty", reset);
      return reset;
    }),
}));
