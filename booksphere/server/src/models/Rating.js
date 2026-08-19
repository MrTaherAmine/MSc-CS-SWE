import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    index: true
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number.'
    }
  }
}, { timestamps: true });

// A reader may rate the same book once. Submitting again updates that rating.
ratingSchema.index({ user: 1, book: 1 }, { unique: true });
ratingSchema.index({ book: 1, updatedAt: -1 });

export default mongoose.model('Rating', ratingSchema);
