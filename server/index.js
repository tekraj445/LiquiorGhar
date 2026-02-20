import express        from 'express';
import cors           from 'cors';
import dotenv         from 'dotenv';
import { connection, sequelize } from './database/db.js';

// ── Models (must load before routes) ──────────────────────
import './Model/admin/index.js';
import './Model/user/index.js';

// ── Admin Routes ──────────────────────────────────────────
import adminDashboardRoutes from './Routes/admin/dashboardRoutes.js';
import adminProductRoutes   from './Routes/admin/productRoutes.js';
import adminOrderRoutes     from './Routes/admin/orderRoutes.js';
import adminReturnRoutes    from './Routes/admin/returnRoutes.js';
import adminUserRoutes      from './Routes/admin/userRoutes.js';

// ── User Routes ───────────────────────────────────────────
import userAuthRoutes     from './Routes/user/userRoutes.js';
import cartRoutes         from './Routes/user/cartRoutes.js';
import wishlistRoutes     from './Routes/user/wishListRoutes.js';
import addressRoutes      from './Routes/user/addressRoutes.js';
import notificationRoutes from './Routes/user/notificationRoutes.js';
import userOrderRoutes    from './Routes/user/orderRoutes.js';
import userProductRoutes  from './Routes/user/productRoutes.js';
import returnRoutes       from './Routes/user/returnRoutes.js';
import reviewRoutes       from './Routes/user/reviewRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin        : 'http://localhost:5173',
  credentials   : true,
  methods       : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── DB Connect ─────────────────────────────────────────────
await connection();
await sequelize.sync({ alter: true });
console.log('✅ All models synced successfully');

// ── Auth Routes (/api/auth/register, /api/auth/login, /api/auth/me)
app.use('/api/auth',          userAuthRoutes);

// ── User Resource Routes ───────────────────────────────────
app.use('/api/products',      userProductRoutes);
app.use('/api/cart',          cartRoutes);
app.use('/api/wishlist',      wishlistRoutes);
app.use('/api/addresses',     addressRoutes);
app.use('/api/orders',        userOrderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews',       reviewRoutes);
app.use('/api/returns',       returnRoutes);

// ── Admin Routes ───────────────────────────────────────────
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/products',  adminProductRoutes);
app.use('/api/admin/orders',    adminOrderRoutes);
app.use('/api/admin/returns',   adminReturnRoutes);
app.use('/api/admin/users',     adminUserRoutes);

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'OK', app: 'Liquor Ghar' }));

// ── Global error handler ───────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));