import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import customerAuthRoutes from './routes/customer-auth';
import customerRoutes from './routes/customer';
import cookieParser from 'cookie-parser';
import mediaRoutes from './routes/media';
import path from 'path';
import { attachUser } from './middleware/auth';
import { attachCustomer } from './middleware/customer-auth';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Cookie parser (needed for refresh tokens)
app.use(cookieParser());

// Attach user/customer if Authorization header present
app.use(attachUser);
app.use(attachCustomer);

// Public API
app.use('/api', publicRoutes);

// Admin Auth
app.use('/api/auth', authRoutes);

// Customer Auth
app.use('/api/customer/auth', customerAuthRoutes);

// Customer API (protected)
app.use('/api/customer', customerRoutes);

// Media routes (public + admin upload)
app.use('/api', mediaRoutes);

// Serve uploaded assets
app.use('/assets/uploads', express.static(path.join(process.cwd(), 'public', 'assets', 'uploads')));

// Admin API
app.use('/api/admin', adminRoutes);

// Health check
app.get('/_health', (_req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Server error' });
});

export default app;
