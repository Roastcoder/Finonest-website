import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const dbConfig = {
  host: process.env.DB_HOST || 'vgc0o0gkw0cgwo0os0g0ksg0',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Finonest@admin@root',
  database: process.env.DB_NAME || 'Fino'
};

let connection: mysql.Connection;

// Connect to MySQL
const connectDB = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('MySQL connection failed:', error);
    process.exit(1);
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

app.get('/api/content/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const [rows] = await connection.execute(
      'SELECT * FROM content_blocks WHERE key = ?',
      [key]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/theme', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM theme_settings');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/pages/:slug/components', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await connection.execute(
      'SELECT * FROM page_components WHERE page_slug = ? ORDER BY sort_order',
      [slug]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
  });
};

startServer();