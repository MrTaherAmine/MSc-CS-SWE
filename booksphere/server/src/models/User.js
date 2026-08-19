import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ''
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: ''
    },
    favoriteGenres: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
