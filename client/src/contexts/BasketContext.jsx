import React, { createContext, useContext, useReducer, useEffect } from "react";
import basketReducer from "../reducers/basketReducer";
import { useAuth } from "./UserAuthContext";

const BasketContext = createContext();

const API_URL = "http://localhost:8000";

const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  loading: false,
};

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);
  const { user } = useAuth();

  const fetchBasketFromBackend = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(`${API_URL}/api/basket`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const backendBasket = await response.json();
        // Omvandlar varukorgens format från backend till frontend
        const frontendBasket = backendBasket.map(item => ({
          uuid: `backend-${item.basket_id}`, // Sätter basket_id som unik identifierare
          productId: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          brand: item.brand,
          image: item.image,
          slug: item.slug,
        }));
        
        dispatch({ type: "SET_BASKET", payload: frontendBasket });
      } else {
        console.error("Kunde inte hämta varukorg från backend");
      }
    } catch (error) {
      console.error("Error fetching basket:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Hämta varukorgen från backend när användaren loggar in
  useEffect(() => {
    if (user) {
      fetchBasketFromBackend();
    } else {
      // Rensa varukorgen när användaren loggar ut
      dispatch({ type: "CLEAR_BASKET" });
    }
  }, [user]);

  // Synca med backend när varukorgen uppdateras (om en användare är inloggad)
  useEffect(() => {
    if (user && state.basket.length > 0) {
      // Syncar bara om vi inte laddar produkterna från backend
      if (!state.loading) {
        syncBasketToBackend();
      }
    } else if (!user) {
      // Sparar varukorgen i localStorage om användaren är utloggad
      localStorage.setItem("basket", JSON.stringify(state.basket));
    }
  }, [state.basket, user, state.loading]);

  const syncBasketToBackend = async () => {
    try {
    } catch (error) {
      console.error("Fel vid syncning med backend:", error);
    }
  };

  return (
    <BasketContext.Provider value={{ state, dispatch, fetchBasketFromBackend }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket måste användas i en BasketProvider");
  }
  return context;
};

export default BasketContext;
