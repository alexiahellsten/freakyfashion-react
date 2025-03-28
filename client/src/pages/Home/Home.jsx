// Home.jsx
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero"; // Import Hero component
import Spots from "../../components/Spots/Spots";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import Cta from "../../components/CallToAction/CallToAction";
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
              rättvis ersättning och arbetar under etiska förhållanden. Varje
              produkt är noggrant framtagen för att kännas lika bra som den ser
              ut. När du handlar hos oss investerar du i plagg med personlighet
              och lång livslängd, samtidigt som du bidrar till en hållbar
              framtid. Freaky Fashion - där stil och samvete möts.`;
  const heroImage = "/images/vit-blus.jpg";

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        const newProducts = data.filter((product) => product.isNew === 1);
        const oldProducts = data.filter((product) => !(product.isNew === 1));

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
