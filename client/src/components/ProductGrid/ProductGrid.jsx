import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../../contexts/UserAuthContext";

function ProductGrid({ products }) {
  const { user } = useAuth();

  
  const handleFavoriteClick = (product) => {
    console.log("Skickar favoritmarkerad produkt:", product.id);

    if (user) {
      // Om användaren är inloggad, spara favoriten till databasen
      fetch("http://localhost:8000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product.id }),
      })
        .then((res) => res.json())
        .catch((err) => console.error("Kunde inte lägga till favorit:", err));
    } else {

      // Om användaren inte är inloggad, spara favoriten till sessionStorage istället
      let favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

      if (!favorites.includes(product.id)) {
        favorites.push(product.id);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
      }
    }
  };


  if (!products || products.length === 0) {
    return <p>Produkter inte tillgängliga.</p>;
  }

  return (
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 m-2.5 w-full">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative overflow-hidden">
            <a href={`/products/${product.slug}`} className="flex flex-col">
              <div className="image-container w-full h-auto relative">
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  className="w-full md:h-110 g:h-120 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {product.showNewBadge && (
                <div className="text-block absolute top-[5px] left-3">
                  <p className="absolute top-2.5 left-0.5 p-2 text-white bg-black rounded-[10px]">
                    Nyhet
                  </p>
                </div>
              )}
            </a>

            <div className="heart-container relative">
    <div className="heart-icon absolute text-2xl text-black bottom-2.5 right-2.5 z-10 transition-transform duration-300 group-hover:scale-110 cursor-pointer">
      {product.isFavourite ? (
        <Heart
          fill="black"
          stroke="black"
          onClick={() => handleFavoriteClick(product)}
          title="Lägg till i favoriter"
        />
      ) : (
        <Heart
          onClick={() => handleFavoriteClick(product)}
          title="Lägg till i favoriter"
        />
      )}
    </div>
  </div>
          </div>

          <CardContent className="p-4">
            <div className="product-description flex justify-between w-full">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <h2 className="text-xl font-semibold">{product.price} SEK</h2>
            </div>
            <div className="brand-name text-center mt-2">
              <p className="text-left text-gray-600 group-hover:text-black transition-colors">
                {product.brand}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProductGrid;
