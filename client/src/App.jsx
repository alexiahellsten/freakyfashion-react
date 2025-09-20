import { Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/UserAuthContext";
import { BasketProvider } from "./contexts/BasketContext";

import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Products/ProductDetails";
import Basket from "./pages/Basket/Basket";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import Search from "./pages/Search/Search";
import Admin from "./pages/Admin/Admin";
import NewProduct from "./pages/Admin/NewProduct";
import Favorites from "./pages/Favorites/Favorites";
import New from "./pages/New/New";
import Login from "./pages/Login/Login";
import Profile from "./pages/Login/Profile";
import Register from "./pages/Register/Register";
import Categories from "./pages/Categories/Categories";
import AdminCategories from "./pages/Admin/Categories";
import NewCategory from "./pages/Admin/NewCategory";

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/new" element={<New />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/confirmation" element={<OrderConfirmation />} />
          <Route path="/search/:slug" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories/:slug" element={<Categories />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/new" element={<NewCategory />} />
        </Routes>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
