import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetail';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import CartPage from './pages/Cart';

import Smartphone from './pages/Smartphone';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';

import Fashion from './pages/Fashion';
import Beauty from './pages/Beauty';
import Food from './pages/Food';

import Details from './pages/Details';
import Dashboard from './Admin/Dashboard';
import User from './Admin/user';
import Products from './Admin/Products';
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<CartPage />} />
      
        <Route path="/products/electronics" element={<Smartphone/>} />
        <Route path="/products/fashion" element={<Fashion/>} />
        <Route path="/products/Beauty" element={<Beauty/>} />
        <Route path="/products/Food" element={<Food />} /> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/products/Food" element={<Food />} /> 
        <Route path="/admin" element={<Dashboard />} /> 
        <Route path="/users" element={<User />} /> 
        <Route path="/products" element={<Products />} /> 
        <Route path="/forgotpassword" element={<Forgotpassword />} /> 
        
        
      
<Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
