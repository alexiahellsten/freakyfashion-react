import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import BasketItems from "../../components/BasketItems/BasketItems";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import CallToAction from "../../components/CallToAction/CallToAction";

function Checkout() {
  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <section className="checkout w-full max-w-4xl mx-auto px-4">
          <div className="flex justify-center sm:mt-10">
            <h2 className="text-2xl font-semibold text-center my-4">Kassa</h2>
          </div>
          <BasketItems />
          <div className="mt-10 mb-10">
            <CheckoutForm />
          </div>
        </section>
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
