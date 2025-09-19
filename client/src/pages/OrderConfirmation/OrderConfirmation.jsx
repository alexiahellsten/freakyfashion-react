import { useEffect } from "react";
import { useBasket } from "../../contexts/BasketContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import CallToAction from "../../components/CallToAction/CallToAction";

function OrderConfirmation() {
  const { state, dispatch } = useBasket();

  useEffect(() => {
    document.title = "Orderkonfirmation";
  }, []);

  useEffect(() => {
    // Skicka ordern till backend när sidan laddas
    const placeOrder = async () => {
      try {
        const orderItems = state.basket.map(item => ({ productId: item.productId, quantity: item.quantity }));

        if (orderItems.length === 0) return;

        const response = await fetch("http://localhost:8000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ orderItems }),
        });

        if (response.ok) {
          dispatch({ type: "CLEAR_BASKET" });
        } else {
          console.error("Kunde inte spara ordern");
        }
      } catch (error) {
        console.error("Fel vid sparning av order:", error);
      }
    };

    placeOrder();
  }, [state.basket, dispatch]);

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <section className="confirmation w-full max-w-4xl mx-auto px-4 mb-10 text-center">
          <div className="flex justify-center sm:mt-10">
            <h2 className="text-2xl font-semibold text-center my-4">
              Tack för ditt köp!
            </h2>
          </div>

          <Card className="w-full mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Din order har bekräftats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Vi har skickat en bekräftelse till din e-postadress med
                orderdetaljer.
              </p>
              <div className="flex justify-center pt-4">
                <Link to="/">
                  <Button className="text-base">
                    Tillbaka till startsidan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}

export default OrderConfirmation;
