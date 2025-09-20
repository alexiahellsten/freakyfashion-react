import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import CallToAction from "../../components/CallToAction/CallToAction";

function Categories() {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryNames = {
    klader: "Kläder",
    accessoarer: "Accessoarer",
    skor: "Skor"
  };

  // Mappar slugs till kategoriernas namn
  const categoryName = categoryNames[slug] || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "");

  const fetchCategoryProducts = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/categories/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av produkter för kategori:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = categoryName;
    fetchCategoryProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laddar produkter..</div>
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
          <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
          <p className="text-gray-600 mb-6">
            Här hittar du alla produkter i denna kategori.
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <>
            <div className="text-center text-lg font-semibold mb-8">
              {`${categoryProducts.length} produkt${categoryProducts.length !== 1 ? 'er' : ''} hittade`}
            </div>
            <ProductGrid products={categoryProducts} />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Inga produkter hittades i denna kategori</h2>
            <p className="text-gray-600">
              Prova en annan kategori eller kom tillbaka senare.
            </p>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}

export default Categories;