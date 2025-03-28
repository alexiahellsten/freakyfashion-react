import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import CallToAction from "../../components/CallToAction/CallToAction";

function ProductDetails() {
  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <SingleProduct />
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}
export default ProductDetails;
