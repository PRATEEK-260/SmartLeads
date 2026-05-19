import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
// Limit payload size to 10kb to prevent DOS
app.use(express.json({ limit: '10kb' }));
app.use('/api', limiter); // Apply rate limiter to all API routes

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI must be defined in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
