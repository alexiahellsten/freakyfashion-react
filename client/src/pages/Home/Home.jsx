import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Spots from "../../components/Spots/Spots";
import ProductGrid from "../../components/ProductGrid/ProductGrid"; // Include ProductGrid only if it's exclusive to Home
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <header>
        <Navbar />
        <Hero />
      </header>
      <main className="flex flex-col justify-center">
        <Spots />
        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}

export default Home;
