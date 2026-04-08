import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import Poster from './models/Poster.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get('/api/posters', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth().userId;

    const posters = await Poster.find({ clerkId: userId })
      .sort({ updatedAt: -1 })
      .select('_id title updatedAt createdAt posterState')
      .lean();

    const summaries = posters.map((poster) => ({
      _id: poster._id,
      title: poster.title,
      updatedAt: poster.updatedAt,
      createdAt: poster.createdAt,
      category: poster.posterState?.category ?? '',
    }));

    res.json(summaries);
  } catch (error) {
    console.error('Fetch posters error:', error);
    res.status(500).json({ error: 'Failed to fetch posters' });
  }
});

app.get('/api/posters/:id', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    const poster = await Poster.findOne({ _id: id, clerkId: userId });

    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    res.json(poster);
  } catch (error) {
    console.error('Fetch single poster error:', error);
    res.status(500).json({ error: 'Failed to fetch poster' });
  }
});

app.post('/api/posters', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth().userId;
    const { title, posterState, designState } = req.body;

    if (!posterState || !designState) {
      return res.status(400).json({ error: 'posterState and designState are required' });
    }

    const newPoster = new Poster({
      clerkId: userId,
      title: title || posterState?.title || posterState?.eventName || 'My Poster',
      posterState,
      designState,
    });

    const savedPoster = await newPoster.save();
    res.status(201).json(savedPoster);
  } catch (error) {
    console.error('Save poster error:', error);
    res.status(500).json({ error: 'Failed to save poster' });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
