import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup'
import Login from './Login'
import ProductListing from './ProductListing'
import ProductDetails from './ProductDetails'
import CartPage from './CartPage'
import CheckoutPage from './CheckoutPage'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './RequireAuth'
import HomeOrAdmin from './HomeOrAdmin'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomeOrAdmin />} />
            <Route path="/Home" element={<HomeOrAdmin />} />
            <Route path="/books" element={<ProductListing />} />
            <Route path="/software" element={<ProductListing />} />
            <Route path="/games" element={<ProductListing />} />
            <Route path="/courses" element={<ProductListing />} />
            <Route path="/products/:type/:category" element={<ProductDetails />} />
            <Route path="/books/:type/:category" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
