import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
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
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
  }
}, { timestamps: true });

commentSchema.index({ recommendation: 1, createdAt: -1, _id: -1 });
commentSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Comment', commentSchema);
