import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import CallToAction from "../../components/CallToAction/CallToAction";
import { useAuth } from "../../contexts/UserAuthContext";

const API_URL = "http://localhost:8000";

function Favorites() {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Hämtar favoriter för gäster eller inloggade användare
  const fetchFavorites = () => {
    setLoading(true);
    if (user) {
      fetch(`${API_URL}/api/favorites`, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          setFavoriteProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fel vid hämtning av favoriter:", error);
          setLoading(false);
        });
    } else {
      const favoriteIds = JSON.parse(sessionStorage.getItem("favorites") || "[]");
      if (favoriteIds.length > 0) {
        Promise.all(
          favoriteIds.map(id =>
            fetch(`${API_URL}/api/products/by-id/${id}`)
              .then(res => res.json())
          )
        )
          .then(products => {
            setFavoriteProducts(products.filter(Boolean));
            setLoading(false);
          })
          .catch(error => {
            console.error("Fel vid hämtning av favoriter:", error);
            setLoading(false);
          });
      } else {
        setFavoriteProducts([]);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    document.title = "Mina favoriter";
    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laddar favoritprodukter..</div>
      </div>
    );
  }

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Mina favoriter</h1>
          <p className="text-gray-600 mb-6">
            Här hittar du alla favoritmarkerade produkter.
          </p>
        </div>

        {favoriteProducts.length > 0 ? (
          <>
            <div className="text-center text-lg font-semibold mb-8">
              {`${favoriteProducts.length} ny${favoriteProducts.length !== 1 ? 'a' : ''} produkt${favoriteProducts.length !== 1 ? 'er' : ''}`}
            </div>
            <ProductGrid products={favoriteProducts} onFavoritesChange={fetchFavorites} />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Hoppsan! Du har inga favoritmarkerade produkter</h2>
            <p className="text-gray-600">
              Du har inte lagt till några produkter som favoriter än. Gå till produktsidan för att lägga till dina favoriter.
            </p>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}

export default Favorites;