import React, { createContext, useContext, useReducer, useEffect } from "react";
import basketReducer from "../reducers/basketReducer";

const BasketContext = createContext();

// Försöker hämta den sparade varukorgen från localStorage.
// Om ingen data finns används en tom array som standard.
const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
};

// BasketProvider är en wrapper-komponent som gör det möjligt att använda BasketContext i hela applikationen.
// useReducer(basketReducer, initialState):
// Använder basketReducer för att hantera varukorgens tillstånd.
// state innehåller det aktuella tillståndet.
// dispatch används för att skicka åtgärder (actions) för att uppdatera tillståndet.
export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  // useEffect körs varje gång state.basket ändras.
  // Uppdaterar localStorage med den nya varukorgen (även om den är tom).
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  // BasketContext.Provider omger  alla barnkomponenter
  // value={{ state, dispatch }} gör så att barnkomponenter kan komma åt state och skicka dispatch-åtgärder.
  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

// useBasket() är en custom hook för att komma åt varukorgens kontext.
// Om den används utanför en BasketProvider kastas ett fel.
export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export default BasketContext;
