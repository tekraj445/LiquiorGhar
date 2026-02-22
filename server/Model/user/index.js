import { User }          from "./user.js";
import { Product }       from "./Product.js";
import { Address }       from "./Address.js";
import { Cart }          from "./Cart.js";
import { Wishlist }      from "./Wishlist.js";
import { Order }         from "./Order.js";
import { OrderItem }     from "./OrderItem.js";
import { Review }        from "./Review.js";
import { Notification }  from "./Notification.js";
import { Return }        from "./Return.js";
import { SupportTicket } from "./SupportTicket.js";

// ── ASSOCIATIONS ──────────────────────────────────────────
User.hasMany(Address,           { foreignKey: "user_id" });
Address.belongsTo(User,         { foreignKey: "user_id" });

User.hasMany(Cart,              { foreignKey: "user_id" });
Cart.belongsTo(User,            { foreignKey: "user_id" });
Cart.belongsTo(Product,         { foreignKey: "product_id", as: "Product" });
Product.hasMany(Cart,           { foreignKey: "product_id" });

User.hasMany(Wishlist,          { foreignKey: "user_id" });
Wishlist.belongsTo(User,        { foreignKey: "user_id" });
Wishlist.belongsTo(Product,     { foreignKey: "product_id", as: "Product" });
Product.hasMany(Wishlist,       { foreignKey: "product_id" });

User.hasMany(Order,             { foreignKey: "user_id" });
Order.belongsTo(User,           { foreignKey: "user_id" });
Order.hasMany(OrderItem,        { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order,      { foreignKey: "order_id" });
OrderItem.belongsTo(Product,    { foreignKey: "product_id", as: "product" });
Product.hasMany(OrderItem,      { foreignKey: "product_id" });

User.hasMany(Review,            { foreignKey: "user_id" });
Review.belongsTo(User,          { foreignKey: "user_id" });
Review.belongsTo(Product,       { foreignKey: "product_id" });
Product.hasMany(Review,         { foreignKey: "product_id", as: "Reviews" });

User.hasMany(Notification,      { foreignKey: "user_id" });
Notification.belongsTo(User,    { foreignKey: "user_id" });

User.hasMany(Return,            { foreignKey: "user_id" });
Return.belongsTo(User,          { foreignKey: "user_id" });
Return.belongsTo(Order,         { foreignKey: "order_id" });

User.hasMany(SupportTicket,     { foreignKey: "user_id" });
SupportTicket.belongsTo(User,   { foreignKey: "user_id" });

export { User, Product, Address, Cart, Wishlist, Order, OrderItem, Review, Notification, Return, SupportTicket };