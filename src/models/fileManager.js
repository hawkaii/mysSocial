
import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileManagerSchema = new mongoose.Schema(
    {
      filename: { type: String, required: true },
      mimetype: { type: String, required: true },
      path: { type: String, required: true },
      originalname: { type: String, required: true },
      size: { type: Number },
      destination: { type: String, required: true},
      userId: {
        type: Number
      }
    },
    { timestamps: true }
  );

fileManagerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const FileManager = mongoose.model('FileManager', fileManagerSchema);

export { FileManager };

