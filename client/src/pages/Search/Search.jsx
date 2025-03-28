import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import CallToAction from "../../components/CallToAction/CallToAction";

const API_URL = "http://localhost:8000";

function Search() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const searchQuery = decodeURIComponent(slug || "");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        if (searchQuery) {
          const filtered = data.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch((error) => {
        console.error("Fel vid hämtning av produkter:", error);
      });
  }, [searchQuery]);

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      <main className="container mx-auto px-4 py-8">
        {searchQuery && (
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">
              Hittade {filteredProducts.length} produkt
              {filteredProducts.length !== 1 ? "er" : ""}.
            </h2>
          </div>
        )}
        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />
    </>
  );
}

export default Search;
