import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useBasket } from "../../contexts/BasketContext"; // Import the custom hook
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Basket() {
  //filteredProducts: En lista som lagrar produkterna som matchar sökningen.
  //searchQuery: En sträng som innehåller den aktuella sökfrågan.

  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //useBasket() hämtar den globala varukorgens tillstånd (state) och dispatch-funktionen
  // från BasketContext.
  //basket extraheras från state och innehåller alla produkter i varukorgen
  const { state, dispatch } = useBasket();
  const { basket } = state;

  //Uppdaterar searchQuery med den nya söksträngen.
  //Om en sökning (query) skrivs in:
  //Filtrerar basket baserat på produktens namn eller varumärke (brand).
  //Uppdaterar filteredProducts med de matchande produkterna.
  //Om sökfältet är tomt (""), återställs filteredProducts till hela varukorgen.
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = basket.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(basket);
    }
  };

  // useEffect körs varje gång basket uppdateras.
  // Säkerställer att den filtrerade listan (filteredProducts) uppdateras när produkter
  // läggs till eller tas bort.
  useEffect(() => {
    setFilteredProducts(basket);
  }, [basket]);

  // Skickar en dispatch-åtgärd (REMOVE_ITEM) till basketReducer för att ta bort en produkt.
  // Produkten tas bort baserat på dess UUID.
  const removeItemFromBasket = (uuid) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { uuid },
    });
  };

  // Skickar en dispatch-åtgärd (UPDATE_ITEM) till basketReducer för
  //  att ändra kvantiteten av en produkt.
  // Produkten identifieras via UUID, och kvantiteten uppdateras med quantity.
  const updateItemQuantity = (uuid, quantity) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { uuid, quantity },
    });
  };

  return (
    <>
      <header>
        <Navbar onSearch={handleSearch} />
      </header>
      <main className="flex flex-col justify-center">
        {searchQuery && (
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">
              Hittade {filteredProducts.length} produkt
              {filteredProducts.length !== 1 ? "er" : ""}.
            </h2>
          </div>
        )}

        {/* Visar enbart ProductGrid om användaren har sökt på något */}
        {searchQuery && <ProductGrid products={filteredProducts} />}

        <section className="checkout w-full max-w-4xl mx-auto px-4">
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium">Varukorg</h2>
          </div>

          <div className="my-4">
            <Table className="hidden sm:table w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-black font-semibold border border-1 px-3 py-2">
                    Produkt
                  </TableHead>
                  <TableHead className="text-black font-semibold border border-1 px-3 py-2">
                    Antal
                  </TableHead>
                  <TableHead className="text-black font-semibold border border-1 px-3 py-2">
                    Pris
                  </TableHead>
                  <TableHead className="text-black font-semibold border border-1 px-3 py-2">
                    Totalt
                  </TableHead>
                  <TableHead className="text-black font-semibold border border-1 px-3 py-2 text-center">
                    Uppdatera
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {basket.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-4">
                      Din varukorg är tom
                    </TableCell>
                  </TableRow>
                ) : (
                  basket.map((item) => (
                    <TableRow key={item.uuid} className="even:bg-muted/50">
                      <TableCell className="border-b border-r border-l px-3 py-2">
                        {item.name}
                      </TableCell>
                      <TableCell className="border-b border-r px-3 py-2">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="border-b border-r px-3 py-2">
                        {item.price} SEK
                      </TableCell>
                      <TableCell className="border-b border-r px-3 py-2">
                        {item.quantity * item.price} SEK
                      </TableCell>
                      <TableCell className="border-b border-r text-center px-3 py-2">
                        {/* Wrap input and button inside a flex container */}
                        <div className="flex items-center justify-center space-x-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(
                                item.uuid,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="border p-1 w-12 text-center"
                            min="1"
                          />
                          <Button
                            variant="destructive"
                            className="bg-red-200 text-foreground hover:bg-red-300"
                            onClick={() => removeItemFromBasket(item.uuid)}
                          >
                            <Trash2 className="icon" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Mobilvy */}
            <div className="sm:hidden my-6 flex flex-col justify-center min-w-full m-2.5">
              {basket.length === 0 ? (
                <div className="flex flex-col space-x-0 border border-black p-2 my-1">
                  <div className="flex">
                    <span className="grow font-medium">
                      Din varukorg är tom
                    </span>
                  </div>
                </div>
              ) : (
                basket.map((item) => (
                  <div
                    key={item.uuid}
                    className="flex flex-col space-x-0 border p-2 my-1"
                  >
                    <div className="flex">
                      <span className="grow font-semibold">
                        {item.quantity} x {item.name}
                      </span>
                      <span className="font-semibold">
                        {item.quantity * item.price} SEK
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {item.price} SEK
                    </span>
                    {/* Input and delete button */}
                    <div className="flex items-center justify-end mt-2 space-x-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemQuantity(
                            item.uuid,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="border p-1 w-12 text-center"
                        min="1"
                      />
                      <Button
                        variant="destructive"
                        className="bg-red-200 text-foreground hover:bg-red-300"
                        onClick={() => removeItemFromBasket(item.uuid)}
                      >
                        <Trash2 className="icon" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center m-5">
            <Button
              onClick={() => navigate("/checkout")}
              className="p-6 m-4 text-xl"
            >
              Till kassan
            </Button>
          </div>
        </section>
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}

export default Basket;
