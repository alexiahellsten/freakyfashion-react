import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home/Home";
import Products from "./Products/Products";
import ProductDetails from "./Products/ProductDetails";
import Search from "./Search/Search";
import Basket from "./Basket/Basket";
import Checkout from "./Checkout/Checkout";
import Admin from "./Admin/Admin";
import AdminProducts from "./Admin/Products";
import NewProduct from "./Admin/NewProduct";

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

        <Routes>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<NewProduct />} />
        </Routes>

        <main className="flex flex-col justify-center">
          <Hero />
          <Spots className="hidden lg:visible" />
          <ProductGrid />
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
