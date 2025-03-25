import { v4 as uuidv4 } from "uuid"; 

// Reducer-funktion som hanterar tillståndet för varukorgen. 
// Reducern tar emot en åtgärd (action) och uppdaterar tillståndet baserat på åtgärdens typ.

// state: Det nuvarande tillståndet (innehåller basket med varor).
// action: Ett objekt som innehåller en type och eventuellt en payload (data som behövs för att uppdatera varukorgen).

const basketReducer = (state, action) => {
  switch (action.type) {

// Kopierar det nuvarande tillståndet (...state).
// Skapar en ny array för basket genom att lägga till den nya produkten (action.payload).
// Tilldelar varje ny produkt en unik UUID.
    case "ADD_ITEM":
      return {
        ...state,
        basket: [
          ...state.basket,
          { ...action.payload, uuid: uuidv4() }, 
        ],
      };

// Filtrerar bort varan vars uuid matchar action.payload.uuid.
// Endast objekt som inte matchar uuid behålls i den nya varukorgen.
    case "REMOVE_ITEM":
      return {
        ...state,
        basket: state.basket.filter((item) => item.uuid !== action.payload.uuid),
      };

// Letar efter en vara i basket med matchande uuid.
// Om varan hittas uppdateras endast quantity.
// Om varan inte matchar behålls den oförändrad.
    case "UPDATE_ITEM":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.uuid === action.payload.uuid
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

//Om åtgärden (action.type) inte matchar något case returneras det nuvarande tillståndet oförändrat.
    default:
      return state;
  }
};

export default basketReducer;
