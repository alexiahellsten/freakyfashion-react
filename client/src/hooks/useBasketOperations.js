import { useCallback } from "react";
import { useBasket } from "../contexts/BasketContext";
import { useAuth } from "../contexts/UserAuthContext";

const API_URL = "http://localhost:8000";

export const useBasketOperations = () => {
  const { state, dispatch, fetchBasketFromBackend } = useBasket();
  const { user } = useAuth();

  const addToBasket = useCallback(async (product, quantity = 1) => {
    if (user) {
      // Hämtar varukorgen från backend om användaren är inloggad
      try {
        const response = await fetch(`${API_URL}/api/basket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            quantity: quantity,
          }),
        });

        if (response.ok) {
          await fetchBasketFromBackend();
        } else {
          console.error("Kunde inte lägga till i varukorg på backend");
        }
      } catch (error) {
        console.error("Kunde inte lägga till i varukorg på backend", error);
      }

    // Om användaren inte är inloggad, spara i localStorage
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          brand: product.brand,
          image: product.image,
          slug: product.slug,
        },
      });
    }
  }, [user, dispatch, fetchBasketFromBackend]);

  const removeFromBasket = useCallback(async (uuid) => {
    if (user) {
      // Hitta basket_id från uuid om användaren är inloggad
      const basketItem = state.basket.find(item => item.uuid === uuid);
      if (basketItem && basketItem.uuid.startsWith('backend-')) {
        const basketId = basketItem.uuid.replace('backend-', '');
        
        try {
          const response = await fetch(`${API_URL}/api/basket/${basketId}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (response.ok) {
            // Hämta varukorgen från backend
            await fetchBasketFromBackend();
          } else {
            console.error("Kunde inte radera från varukorgen på backend");
          }
        } catch (error) {
          console.error("Kunde inte radera från varukorgen på backend", error);
        }
      }
    } else {
      // Ta bort från localStorage om användaren är utloggad
      dispatch({
        type: "REMOVE_ITEM",
        payload: { uuid },
      });
    }
  }, [user, state.basket, dispatch, fetchBasketFromBackend]);

  const updateQuantity = useCallback(async (uuid, quantity) => {
    if (user) {
      // Om användaren är inloggad, hitta basket_id genom uuid
      const basketItem = state.basket.find(item => item.uuid === uuid);
      if (basketItem && basketItem.uuid.startsWith('backend-')) {
        const basketId = basketItem.uuid.replace('backend-', '');
        
        try {
          const response = await fetch(`${API_URL}/api/basket/${basketId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ quantity }),
          });

          if (response.ok) {
            // Hämta varukorg från backend
            await fetchBasketFromBackend();
          } else {
            console.error("Failed to update quantity in backend basket");
          }
        } catch (error) {
          console.error("Error updating quantity in backend basket:", error);
        }
      }
    } else {
      // Om användaren är utloggad, uppdatera i localStorage
      dispatch({
        type: "UPDATE_ITEM",
        payload: { uuid, quantity },
      });
    }
  }, [user, state.basket, dispatch, fetchBasketFromBackend]);

  const clearBasket = useCallback(async () => {
    if (user) {
      // Om användaren är inloggad, rensa varukorgen på backend
      try {
        const response = await fetch(`${API_URL}/api/basket`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          // Hämta varukorgen från backend igen (borde vara tom)
          await fetchBasketFromBackend();
        } else {
          console.error("Kunde inte rensa varukorgen på backend");
        }
      } catch (error) {
        console.error("Kunde inte rensa varukorgen på backend", error);
      }
    } else {
      // Om användaren är utloggad, rensa varukorgen från localStorage
      dispatch({ type: "CLEAR_BASKET" });
    }
  }, [user, dispatch, fetchBasketFromBackend]);

  return {
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    basket: state.basket,
    loading: state.loading,
  };
};
