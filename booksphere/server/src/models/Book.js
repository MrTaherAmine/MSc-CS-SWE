import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  externalId: { type: String, trim: true, index: true },
  source: { type: String, enum: ['google-books', 'open-library', 'manual'], default: 'manual' },
  title: { type: String, required: true, trim: true, index: true },
  authors: { type: [String], default: [] },
  description: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  isbn10: { type: String, default: '' },
  isbn13: { type: String, default: '' },
  genres: { type: [String], default: [], index: true },
  publishedDate: { type: String, default: '' },
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  ratingsCount: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

bookSchema.index({ externalId: 1, source: 1 }, {
  unique: true,
  partialFilterExpression: { externalId: { $type: 'string', $ne: '' } }
});
bookSchema.index({ title: 'text', authors: 'text', description: 'text' });

export default mongoose.model('Book', bookSchema);
