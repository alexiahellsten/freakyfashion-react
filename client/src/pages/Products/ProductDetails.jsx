import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import CallToAction from "../../components/CallToAction/CallToAction";

function ProductDetails() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product) {
      document.title = product.name;
    }
  }, [product]);

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <SingleProduct setProduct={setProduct} />
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}
export default ProductDetails;
