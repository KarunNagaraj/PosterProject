import mongoose from 'mongoose';

const PosterSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, index: true },
    title: { type: String, default: 'Untitled Poster' },

    // Store the full current frontend state as-is
    posterState: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    designState: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model('Poster', PosterSchema);
