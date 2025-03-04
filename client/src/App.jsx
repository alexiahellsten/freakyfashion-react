import { BrowserRouter } from "react-router";
// import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Spots from "./components/Spots/Spots";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main className="flex flex-col justify-center">
          <Hero />
          <Spots className="hidden lg:visible" />
          <ProductGrid />
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
