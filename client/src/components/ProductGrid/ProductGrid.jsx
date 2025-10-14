import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../../contexts/UserAuthContext";

function ProductGrid({ products, onFavoritesChange }) {
  const { user } = useAuth();
  const [favoriteProduct, setFavoriteProduct] = useState([]);

  // Hämtar favoriter från backend-apiet eller sessionStorage (utloggad/gäst)
  const fetchFavorites = () => {
    if (user) {
      fetch(`http://localhost:8000/api/favorites`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setFavoriteProduct(data.map((p) => p.id)))
        .catch(() => setFavoriteProduct([]));
    } else {
      const favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
      setFavoriteProduct(favorites);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleFavoriteClick = (product) => {
    const isFavorite = favoriteProduct.includes(product.id);

    if (isFavorite) {
      // Ta bort från favoriter
      if (user) {
        fetch(`${API_URL}/api/favorites/${product.id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(() => {
            fetchFavorites();
            if (onFavoritesChange) onFavoritesChange();
          })
          .catch((err) => console.error("Kunde inte ta bort favorit:", err));
      } else {
        let favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
        favorites = favorites.filter((id) => id !== product.id);
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
        setFavoriteProduct(favorites);
        if (onFavoritesChange) onFavoritesChange();
      }
    } else {
      // Lägg till i favoriter
      if (user) {
        fetch(`${API_URL}/api/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId: product.id }),
        })
          .then((res) => res.json())
          .then(() => {
            fetchFavorites();
            if (onFavoritesChange) onFavoritesChange();
          })
          .catch((err) => console.error("Kunde inte lägga till favorit:", err));
      } else {
        let favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
        if (!favorites.includes(product.id)) {
          favorites.push(product.id);
          sessionStorage.setItem("favorites", JSON.stringify(favorites));
          setFavoriteProduct(favorites);
          if (onFavoritesChange) onFavoritesChange();
        }
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
            <Link to={`/products/${product.slug}`} className="flex flex-col">
              <div className="image-container w-full h-auto relative">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : product.image.startsWith("/images/")
                      ? product.image
                      : `/images/${product.image}`
                  }
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
            </Link>

            <div className="heart-container relative">
              <div className="heart-icon absolute text-2xl text-black bottom-2.5 right-2.5 z-10 transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                {favoriteProduct.includes(product.id) ? (
                  <Heart
                    fill="black"
                    stroke="black"
                    onClick={() => handleFavoriteClick(product)}
                    title="Ta bort från favoriter"
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
