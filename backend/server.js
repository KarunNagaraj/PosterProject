import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import Poster from './models/Poster.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Clerk Middleware to parse authentication headers
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey:
      process.env.CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// --- API ROUTES ---

// 1. GET route to fetch all posters for the logged-in user
// requireAuth() ensures ONLY users with a valid Clerk token can hit this route
app.get('/api/posters', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth().userId; // Clerk Express exposes auth as a function on req
    const posters = await Poster.find({ clerkId: userId }).sort({ updatedAt: -1 });
    res.json(posters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posters' });
  }
});

// 2. POST route to save a new poster design
app.post('/api/posters', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { title, posterState, designState } = req.body;

    const newPoster = new Poster({
      clerkId: userId,
      title: title || 'My Awesome Design',
      posterState,
      designState,
    });

    const savedPoster = await newPoster.save();
    res.status(201).json(savedPoster);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save poster' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
