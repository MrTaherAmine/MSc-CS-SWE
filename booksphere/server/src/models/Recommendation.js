import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
  recommendationText: { type: String, required: true, trim: true, minlength: 3, maxlength: 1500 },
  rating: { type: Number, min: 1, max: 5, required: true },
  tags: { type: [String], default: [] },
  visibility: { type: String, enum: ['public', 'followers', 'private'], default: 'public', index: true },
  likesCount: { type: Number, min: 0, default: 0 },
  commentsCount: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

recommendationSchema.index({ createdAt: -1 });
recommendationSchema.index({ user: 1, createdAt: -1 });
recommendationSchema.index({ book: 1, createdAt: -1 });
recommendationSchema.index({ visibility: 1, createdAt: -1 });

export default mongoose.model('Recommendation', recommendationSchema);
