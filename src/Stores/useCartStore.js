import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set, get) => ({
  cart: [],
  events: [],

  // Lägg till produkt i cart med initial totalPrice
  addToCart: (product) => {
    console.log("Adding to cart:", product);
  
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        console.log(`Current quantity for ${product.name}: ${existingProduct.quantity}`);
  
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
  
    // Logga den senaste kvantiteten efter att produkten har lagts till varukorgen
    const updatedProduct = get().cart.find((item) => item.id === product.id);
    console.log(`Updated quantity for ${product.name}: ${updatedProduct?.quantity}`);
  },

  removeFromCart: (productId) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === productId);
  
      if (!existingProduct) return { cart: state.cart };
  
      if (existingProduct.quantity <= 1) {
        // Ta bort produkten helt
        return {
          cart: state.cart.filter((item) => item.id !== productId),
        };
      }
  
      // Annars minska kvantiteten
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

  // Minska totalpriset för ett event
/*   decreasePrice: (productId) => {
    const event = get().cart.find((item) => item.id === productId);
    if (event && event.totalPrice > event.price) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId
            ? { ...item, totalPrice: item.totalPrice - item.price }
            : item
        ),
      }));
    }
  }, */

  // Hämta totalPrice för ett event
  getTotalPrice: (productId) => {
    const product = get().cart.find((item) => item.id === productId);
    return product ? product.totalPrice : 0;
  },

  fetchEvents: async () => {
    try {
      const response = await axios.get("https://santosnr6.github.io/Data/events.json");
      set({ events: response.data.events });
    } catch (error) {
      console.error("Kunde inte hämta events:", error);
    }
  },
}));

export default useCartStore;



