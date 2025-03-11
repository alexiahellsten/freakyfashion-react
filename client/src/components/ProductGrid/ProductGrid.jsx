import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  if (!products) return <p>Produkter inte tillgängliga.</p>;

  return (
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 m-2.5 w-full">
      {products.map((product) => {
        const imageUrl = product.image?.url
          ? `${API_URL.replace("/api", "")}${product.image.url}`
          : "https://placehold.co/600x400?text=Image+Not+Found";

        return (
          <article
            key={product.id}
            className="product-card flex flex-col relative"
          >
            <a href={`/products/${product.slug}`} className="flex flex-col">
              <div className="image-container w-full h-auto relative">
                {/* TODO: Lägg till någon hover-effekt? */}
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full md:h-110 g:h-120 object-cover"
                />
              </div>
              <div className="new-container">
                {/* TODO: Fixa nyhetsbadgens logik - ska visas endast om produkten publicerades för mindre än 7 dagar sedan*/}
                {(product.isNew === true || product.isNew === 1) && (
                  <div className="text-block absolute top-[5px] left-3">
                    <p className="absolute top-2.5 left-0.5 p-2 text-white bg-black rounded-[10px]">
                      Nyhet
                    </p>
                  </div>
                )}
              </div>
            </a>
            <div className="heart-container relative">
              <div className="heart-icon absolute text-2xl text-black bottom-2.5 right-2.5 z-10">
                <a href={`/products/${product.slug}`}>
                  {product.isFavourite ? (
                    <Heart fill="black" stroke="black" />
                  ) : (
                    <Heart />
                  )}
                </a>
              </div>
            </div>
            <div className="product-description-container">
              <div className="product-description flex justify-between w-full">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <h2 className="text-xl font-semibold">{product.price} SEK</h2>
              </div>
              <div className="brand-name text-center mt-2">
                <p className="text-left">{product.brand}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductGrid;
