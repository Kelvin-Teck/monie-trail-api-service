import express from 'express'
import dotenv from 'dotenv'
import { initDatabase } from './config/database.js';
dotenv.config();

// Routes Importations
import transactionRoutes  from './routes/transactions.js'
import RateLimiter from './middlewares/rateLimiter.js';

const PORT = process.env.PORT || 5002
const app = express();


// App Level Middlewares
app.use(express.json())
// app.use(RateLimiter)
//
app.get("/", (req, res) => {
  res.send(`Server is up and running!!!`);
});

app.use('/api/transaction', transactionRoutes)





const startApp = async () => {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
}

startApp()