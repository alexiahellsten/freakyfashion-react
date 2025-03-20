import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Spots from "../../components/Spots/Spots";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";

const API_URL = "http://localhost:8000";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        const newProducts = data.filter((product) => {
          return product.isNew === 1;
        });

        const oldProducts = data.filter((product) => {
          return !(product.isNew === 1);
        });

        const sortedProducts = [...newProducts, ...oldProducts];

        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      //Återställer till den originala arrayen av produkter när man suddar ut söktermen
      setFilteredProducts(products);
    }
  };

  return (
    <>
      <header>
        <Navbar onSearch={handleSearch} />
        {!searchQuery && <Hero />}
      </header>
      <main className="flex flex-col justify-center">
        <Spots />
        {searchQuery && (
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">
              Hittade {filteredProducts.length} produkt
              {filteredProducts.length !== 1 ? "er" : ""}.
            </h2>
          </div>
        )}
        <ProductGrid products={filteredProducts} />
        <StoreInformation />
      </main>
      <Footer />
    </>
  );
}

export default Home;
