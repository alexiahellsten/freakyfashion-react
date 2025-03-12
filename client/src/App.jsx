import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails";
import Search from "./pages/Search/Search";
import Basket from "./pages/Basket/Basket";
import Checkout from "./pages/Checkout/Checkout";
import Admin from "./pages/Admin/Admin";
import AdminProducts from "./pages/Admin/Products";
import NewProduct from "./pages/Admin/NewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search/:slug" element={<Search />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
