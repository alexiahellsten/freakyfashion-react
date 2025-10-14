import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import CallToAction from "../../components/CallToAction/CallToAction";

function New() {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Nyheter";

    // Load products from static JSON file
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        // Filtrerar nya produkter som publicerats inom de senaste 7 dagarna
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const filteredNewProducts = data
          .filter((product) => {
            const publicationDate = new Date(product.publicationDate);

            console.log(
              `Product: ${product.name}, publicationDate: ${product.publicationDate}, isNew: ${product.isNew}`
            );

            const isWithinRange =
              publicationDate >= sevenDaysAgo && publicationDate <= today;
            const isNewProduct = product.isNew === true;

            return isWithinRange && isNewProduct;
          })
          .sort((a, b) => {
            // Sorterar efter publiceringsdatum - nyast först
            const dateA = new Date(a.publicationDate);
            const dateB = new Date(b.publicationDate);
            return dateB - dateA;
          })
          .map((product) => ({
            ...product,

            // Alla produkter på sidan är nya, så ingen badge behövs
            showNewBadge: false,
          }));
        setNewProducts(filteredNewProducts);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av nya produkter:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laddar nya produkter..</div>
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
          <h1 className="text-3xl font-bold mb-4">Nyheter</h1>
          <p className="text-gray-600 mb-6">
            Upptäck våra senaste produkter från de senaste 7 dagarna
          </p>
          <div className="text-lg font-semibold">
            {newProducts.length > 0
              ? `${newProducts.length} ny${
                  newProducts.length !== 1 ? "a" : ""
                } produkt${newProducts.length !== 1 ? "er" : ""}`
              : "Inga nya produkter just nu"}
          </div>
        </div>

        {newProducts.length > 0 ? (
          <ProductGrid products={newProducts} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Inga nya produkter</h2>
            <p className="text-gray-600">
              Det finns inga nya produkter från de senaste 7 dagarna. Kom
              tillbaka snart för att se våra senaste nyheter!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default New;
