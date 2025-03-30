import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Spots from "../../components/Spots/Spots";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import CallToAction from "../../components/CallToAction/CallToAction";

const API_URL = "http://localhost:8000";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const heroTitle = "Hållbart mode";
  const heroDescription = `Upptäck Freaky Fashion – unika, miljövänliga plagg & accessoarer,
              skapade med stil och rättvisa i fokus. Hos Freaky Fashion
              kombinerar vi unik design med omtanke för både människor och
              planeten. Våra kläder och accessoarer tillverkas småskaligt av
              högkvalitativa, miljövänliga material, vilket innebär hållbarhet
              utan att kompromissa med stil. Genom rättvis produktion
              säkerställer vi att alla som är involverade i processen får
              rättvis ersättning och arbetar under etiska förhållanden.`;
  const heroImage = "/images/vit-blus.jpg";
  useEffect(() => {
    document.title = "Freaky Fashion";

    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filtered = data.filter((product) => {
          const publicationDate = new Date(product.publicationDate);
          publicationDate.setHours(0, 0, 0, 0);
          return publicationDate <= today;
        });

        setProducts(filtered);
        setFilteredProducts(filtered);
      })
      .catch((error) => console.error("Fel vid hämtning av produkter:", error));
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
      setFilteredProducts(products);
    }
  };

  return (
    <>
      <header>
        <CallToAction />
        <Navbar onSearch={handleSearch} />
        {!searchQuery && (
          <Hero
            heroTitle={heroTitle}
            heroDescription={heroDescription}
            heroImage={heroImage}
          />
        )}
      </header>
      <main className="flex flex-col justify-center">
        {!searchQuery && <Spots />}
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
