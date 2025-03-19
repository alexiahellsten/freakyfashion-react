import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"; // Make sure to import from 'react-router-dom' instead of 'react-router'
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${API_URL}/api/products/${slug}`);
        const data = await response.json();

        if (data) {
          setProduct(data); // Assuming 'data' is a single product here
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

  const imageUrl = product.image
    ? `/images/${product.image}` // Assuming the product image is stored in /public/images/
    : "https://placehold.co/600x400?text=Image+Not+Found";

  return (
    <div>
      <div className="product-details flex flex-col w-full">
        <article className="product-card chosen-product flex flex-col sm:flex-row p-2.5">
          <div className="image-container w-full sm:w-1/2 lg:w-1/3">
            <img
              src={imageUrl} // Render the image based on the constructed URL
              alt={product.name} // Use 'name' instead of 'title' if 'name' is more appropriate in your data
              className="w-full"
            />
          </div>
          <div className="product-description-container flex flex-col justify-start w-full sm:w-1/2 lg:w-2/3 p-5 space-y-2">
            <h2 className="text-2xl font-semibold">{product.name}</h2>{" "}
            {/* Use 'name' */}
            <p className="text-lg font-medium text-black">{product.brand}</p>
            <p className="text-base text-black mt-2">{product.description}</p>
            <p className="text-xl font-semibold text-gray-800 mt-4">
              {product.price} SEK
            </p>
            <Button
              asChild
              className="w-full sm:w-1/3 md:w-1/3 lg:w-1/5 p-1 mt-2"
            >
              <Link to="#">Lägg i varukorg</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductPage;
