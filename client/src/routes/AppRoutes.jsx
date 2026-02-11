import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage     from "../page/public/Landingpage";
import Login           from "../page/public/Login";
import Register        from "../page/public/Register";

// User
import DashboardLayout from "../page/private/user/DashboardLayout";
import Dashboard       from "../page/private/user/Dashboard";
import Products        from "../page/private/user/Products";
import Cart            from "../page/private/user/Cart";
import Wishlist        from "../page/private/user/Wishlist";
import Orders          from "../page/private/user/Orders";
import Profile         from "../page/private/user/Profile";
import Addresses       from "../page/private/user/Addresses";

// Admin
import AdminLayout     from "../page/private/admin/AdminLayout";
import AdminDashboard  from "../page/private/admin/Dashboard";
import AdminProducts   from "../page/private/admin/Products";
import AdminOrders     from "../page/private/admin/Orders";
import AdminReturns    from "../page/private/admin/Returns";
import AdminUsers      from "../page/private/admin/Users";

import PrivateRoutes   from "./PrivateRoutes";

function AppRoutes({ cartCount, addToCart, cart, updateQty, removeFromCart, clearCart, wishlist, toggleWishlist }) {
  const sharedProps = { cart, addToCart, removeFromCart, updateQty, clearCart, wishlist, toggleWishlist };

  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout cartCount={cartCount} />}>
          <Route path="/user/dashboard" element={<Dashboard addToCart={addToCart} />} />
          <Route path="/user/products"  element={<Products {...sharedProps} />} />
          <Route path="/user/cart"      element={<Cart cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/user/wishlist"  element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
          <Route path="/user/orders"    element={<Orders addToCart={addToCart} />} />
          <Route path="/user/profile"   element={<Profile />} />
          <Route path="/user/addresses" element={<Addresses />} />
          <Route path="/user/*"         element={<Navigate to="/user/dashboard" replace />} />
        </Route>
      </Route>

      {/* Admin Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products"  element={<AdminProducts />} />
          <Route path="/admin/orders"    element={<AdminOrders />} />
          <Route path="/admin/returns"   element={<AdminReturns />} />
          <Route path="/admin/users"     element={<AdminUsers />} />
          <Route path="/admin/*"         element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;