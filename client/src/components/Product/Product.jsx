import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const Product = ({ product }) => {
  const imageUrl = product.image?.url
    ? `${API_URL.replace("/api", "")}${product.image.url}`
    : "https://placehold.co/600x400?text=Image+Not+Found";

  return (
    <div>
      <div className="product-details flex flex-col w-full">
        <article className="product-card chosen-product flex flex-col sm:flex-row p-2.5">
          <div className="image-container w-full sm:w-1/2 lg:w-1/3">
            <img src={imageUrl} alt={product.title} className="w-full" />
          </div>
          <div className="product-description-container flex flex-col justify-start w-full sm:w-1/2 lg:w-2/3 p-5 space-y-2">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
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

export default Product;
