import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import Product from "../../components/Product/Product";

function ProductDetails() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <Product />
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}
export default ProductDetails;
