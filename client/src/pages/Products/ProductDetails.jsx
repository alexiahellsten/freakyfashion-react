import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import SingleProduct from "../../components/SingleProduct/SingleProduct";

function ProductDetails() {
  return (
    <>
      <header>
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
