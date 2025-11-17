import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/type";

export interface CartItem {
  product: ProductType;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: ProductType, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,

      // ADD TO CART
      addToCart: (product, size, color) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              item.color === color
          );

          let newItems: CartItem[];

          if (existingItemIndex > -1) {
            newItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [...state.items, { product, size, color, quantity: 1 }];
          }

          return calculateTotals(newItems);
        });
      },

      //  REMOVE FROM CART
      removeFromCart: (productId, size, color) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color === color
              )
          );

          return calculateTotals(newItems);
        });
      },

      //  UPDATE QUANTITY
      updateQuantity: (productId, size, color, quantity) => {
        set((state) => {
          let newItems = state.items;

          if (quantity <= 0) {
            newItems = state.items.filter(
              (item) =>
                !(
                  item.product.id === productId &&
                  item.size === size &&
                  item.color === color
                )
            );

            return calculateTotals(newItems);
          }

          newItems = state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity }
              : item
          );

          return calculateTotals(newItems);
        });
      },

      // CLEAR EVERYTHING
      clearCart: () => {
        set({
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        });
      },
    }),

    {
      name: "cart-storage",
    }
  )
);

// Helper to calculate totals
function calculateTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return { items, totalQuantity, totalPrice };
}
