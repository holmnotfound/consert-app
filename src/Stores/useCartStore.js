import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set, get) => ({
  cart: [],
  events: [],

  addToCart: (product) => {
    console.log("Adding to cart:", product);

    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        console.log(
          `Current quantity for ${product.name}: ${existingProduct.quantity}`
        );

        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.price * (item.quantity + 1),
                }
              : item
          ),
        };
      } else {
        return {
          cart: [
            ...state.cart,
            { ...product, quantity: 1, totalPrice: product.price },
          ],
        };
      }
    });

    const updatedProduct = get().cart.find((item) => item.id === product.id);
    console.log(
      `Updated quantity for ${product.name}: ${updatedProduct?.quantity}`
    );
  },

  removeFromCart: (productId) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === productId);

      if (!existingProduct) return { cart: state.cart };

      if (existingProduct.quantity <= 1) {
        return {
          cart: state.cart.filter((item) => item.id !== productId),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price * (item.quantity - 1),
              }
            : item
        ),
      };
    });
  },

  getTotalPrice: (productId) => {
    const product = get().cart.find((item) => item.id === productId);
    return product ? product.totalPrice : 0;
  },

  fetchEvents: async () => {
    try {
      const response = await axios.get(
        "https://santosnr6.github.io/Data/events.json"
      );
      set({ events: response.data.events });
    } catch (error) {
      console.error("Kunde inte hämta events:", error);
    }
  },
}));

export default useCartStore;
