import axiosInstance from "./axiosInstance";

// ═══════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════
export const authAPI = {
  register     : (data)       => axiosInstance.post("/auth/register", data),
  login        : (data)       => axiosInstance.post("/auth/login", data),
  getMe        : ()           => axiosInstance.get("/auth/me"),
  updateProfile: (data)       => axiosInstance.put("/auth/profile", data),
};

// ═══════════════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════════════
export const productAPI = {
  getAll     : (params)       => axiosInstance.get(`/products?${params}`),
  getTrending: ()             => axiosInstance.get("/products?limit=4&sort=rating"),
  getById    : (id)           => axiosInstance.get(`/products/${id}`),
};

// ═══════════════════════════════════════════════
//  CART
// ═══════════════════════════════════════════════
export const cartAPI = {
  getCart  : ()                     => axiosInstance.get("/cart"),
  addItem  : (product_id, quantity) => axiosInstance.post("/cart", { product_id, quantity }),
  updateItem: (productId, quantity) => axiosInstance.put(`/cart/${productId}`, { quantity }),
  removeItem: (productId)           => axiosInstance.delete(`/cart/${productId}`),
  clearCart : ()                    => axiosInstance.delete("/cart"),
};

// ═══════════════════════════════════════════════
//  WISHLIST
// ═══════════════════════════════════════════════
export const wishlistAPI = {
  getWishlist: ()             => axiosInstance.get("/wishlist"),
  addItem    : (product_id)   => axiosInstance.post("/wishlist", { product_id }),
  removeItem : (productId)    => axiosInstance.delete(`/wishlist/${productId}`),
};

// ═══════════════════════════════════════════════
//  ORDERS
// ═══════════════════════════════════════════════
export const orderAPI = {
  getAll  : (params = "")     => axiosInstance.get(`/orders?${params}`),
  getStats: ()                => axiosInstance.get("/orders/stats"),
  place   : (data)            => axiosInstance.post("/orders", data),
  cancel  : (id)              => axiosInstance.patch(`/orders/${id}/cancel`),
};

// ═══════════════════════════════════════════════
//  ADDRESSES
// ═══════════════════════════════════════════════
export const addressAPI = {
  getAll    : ()              => axiosInstance.get("/addresses"),
  add       : (data)          => axiosInstance.post("/addresses", data),
  setDefault: (id)            => axiosInstance.patch(`/addresses/${id}/default`),
  remove    : (id)            => axiosInstance.delete(`/addresses/${id}`),
};

// ═══════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════
export const notificationAPI = {
  getAll  : ()                => axiosInstance.get("/notifications"),
  markRead: (id)              => axiosInstance.patch(`/notifications/${id}/read`),
};

// ═══════════════════════════════════════════════
//  REVIEWS
// ═══════════════════════════════════════════════
export const reviewAPI = {
  getByProduct: (productId)   => axiosInstance.get(`/reviews/${productId}`),
  add         : (data)        => axiosInstance.post("/reviews", data),
};

// ═══════════════════════════════════════════════
//  RETURNS
// ═══════════════════════════════════════════════
export const returnAPI = {
  request: (order_id, reason) => axiosInstance.post("/returns", { order_id, reason }),
};

// ═══════════════════════════════════════════════
//  ADMIN — DASHBOARD
// ═══════════════════════════════════════════════
export const adminDashboardAPI = {
  getStats       : ()         => axiosInstance.get("/admin/dashboard/stats"),
  getRecentOrders: ()         => axiosInstance.get("/admin/dashboard/recent-orders"),
};

// ═══════════════════════════════════════════════
//  ADMIN — PRODUCTS
// ═══════════════════════════════════════════════
export const adminProductAPI = {
  getAll: (search = "")       => axiosInstance.get(`/admin/products?search=${search}`),
  create: (data)              => axiosInstance.post("/admin/products", data),
  update: (id, data)          => axiosInstance.put(`/admin/products/${id}`, data),
  remove: (id)                => axiosInstance.delete(`/admin/products/${id}`),
};

// ═══════════════════════════════════════════════
//  ADMIN — CATEGORIES
// ═══════════════════════════════════════════════
export const adminCategoryAPI = {
  getAll: ()                  => axiosInstance.get("/admin/categories"),
  create: (data)              => axiosInstance.post("/admin/categories", data),
  update: (id, data)          => axiosInstance.put(`/admin/categories/${id}`, data),
  remove: (id)                => axiosInstance.delete(`/admin/categories/${id}`),
};

// ═══════════════════════════════════════════════
//  ADMIN — ORDERS
// ═══════════════════════════════════════════════
export const adminOrderAPI = {
  getAll      : ()            => axiosInstance.get("/admin/orders"),
  getStats    : ()            => axiosInstance.get("/admin/orders/stats"),
  updateStatus: (id, status)  => axiosInstance.put(`/admin/orders/${id}/status`, { status }),
};

// ═══════════════════════════════════════════════
//  ADMIN — RETURNS
// ═══════════════════════════════════════════════
export const adminReturnAPI = {
  getAll      : ()            => axiosInstance.get("/admin/returns"),
  updateStatus: (id, status)  => axiosInstance.put(`/admin/returns/${id}/status`, { status }),
};

// ═══════════════════════════════════════════════
//  ADMIN — USERS
// ═══════════════════════════════════════════════
export const adminUserAPI = {
  getAll        : (search = "") => axiosInstance.get(`/admin/users?search=${search}`),
  toggleSuspend : (id)          => axiosInstance.put(`/admin/users/${id}/suspend`),
  remove        : (id)          => axiosInstance.delete(`/admin/users/${id}`),
};