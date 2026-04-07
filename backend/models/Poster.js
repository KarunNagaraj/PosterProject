import mongoose from 'mongoose';

const PosterSchema = new mongoose.Schema({
  // clerkId ensures we can query posters belonging to specific users
  clerkId: { type: String, required: true }, 
  title: { type: String, default: "Untitled Poster" },
  
  // Storing your Zustand 'poster' state
  posterState: {
    logoImg: String,
    university: String,
    dept: String,
    campus: String,
    tagline: String,
    eventType: String,
    eventName: String,
    eventDate: String,
    eventTime: String,
    venue: String,
    website: String,
    speakerName: String,
    speakerRole: String,
    speakerCompany: String,
    speakerImg: String,
    coordinators: String,
  },

  // Storing your Zustand 'design' state
  designState: {
    gradient: Number,
    accent: String,
    layout: Number,
    font: String,
    bgtype: String,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt dates

export default mongoose.model('Poster', PosterSchema);