import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recommendation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recommendation',
    required: true,
    index: true
  }
}, { timestamps: true });

likeSchema.index({ user: 1, recommendation: 1 }, { unique: true });
likeSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Like', likeSchema);
