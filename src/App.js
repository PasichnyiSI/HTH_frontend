import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Base from "./components/Base";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";
import SignIn from "./pages/LogInPage";
import SignUp from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import ComparisonPage from './pages/Comparison'
import AboutUs from './pages/AboutUs'
import ContactPage from './pages/Contacts'
import ShippingPaymentPage from './pages/Shipping'
import ReturnPolicyPage from './pages/ReturnPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'

import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'


function App() {

  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [noveltiesProducts, setNoveltiesProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  // Вибираємо всі продукти по API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/router/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error fetching products: ", error));
      
  }, []);
  // console.log(products);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/router/popular-products/")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.log("Error fetching products: ", error));
      
  }, []);
  // console.log(popularProducts);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/router/novelties-products/")
      .then((response) => response.json())
      .then((data) => setNoveltiesProducts(data))
      .catch((error) => console.log("Error fetching products: ", error));
      
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/router/best-products/")
      .then((response) => response.json())
      .then((data) => setBestProducts(data))
      .catch((error) => console.log("Error fetching products: ", error));
      
  }, []);

  useEffect(() => {
    // Запит на отримання категорій
    fetch("http://127.0.0.1:8000/api/router/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log("Помилка отримання категорій:", error));
  }, []);

  return (
    // Використовуємо Router для обгортання всього додатка, щоб додати маршрутизацію.
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Base categories={categories}/>}>
            <Route index element={<HomePage popularProducts={popularProducts} noveltiesProducts={noveltiesProducts} bestProducts={bestProducts} />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/products" element={<Shop products={products} />} />
            <Route path="/product/:slug" element={<ProductPage/>} />
            <Route path="/login" element={<SignIn/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/comparison" element={<ComparisonPage/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/contacts" element={<ContactPage/>} />
            <Route path="/shipping" element={<ShippingPaymentPage/>} />
            <Route path="/return" element={<ReturnPolicyPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
