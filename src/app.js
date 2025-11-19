import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';


const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send('Notes API is running...');
});

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB connection failed');
  }
});

export default app;