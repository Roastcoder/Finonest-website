import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'vgc0o0gkw0cgwo0os0g0ksg0',
  port: 3306,
  user: 'admin',
  password: 'Finonest@admin@root',
  database: 'Fino'
}

let connection: mysql.Connection | null = null;

export const connectDB = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection(dbConfig);
      console.log('MySQL connected successfully');
    }
    return connection;
  } catch (error) {
    console.error('MySQL connection failed:', error);
    throw error;
  }
};

export const query = async (sql: string, params?: any[]) => {
  try {
    const conn = await connectDB();
    const [results] = await conn.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query failed:', error);
    throw error;
  }
};

export default { connectDB, query };