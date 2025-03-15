import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import Product from "../../components/Product/Product";
import Slideshow from "../../components/Slideshow/Slideshow";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${API_URL}/products?populate=*`);
        const data = await response.json();

        const filteredProduct = data.data.find(
          (product) => product.slug === slug
        );

        if (filteredProduct) {
          setProduct(filteredProduct);

          const relatedProducts = data.data.filter(
            (prod) =>
              prod.slug !== slug && prod.category === filteredProduct.category
          );

          setSimilarProducts(relatedProducts);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product", error);
      }
    }

    fetchProduct();
  }, [slug]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col justify-center">
        <Product product={product} />
        <Slideshow products={similarProducts} />
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
