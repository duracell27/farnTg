import mongoose, { Schema } from "mongoose";

const CropSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: { type: String, required: true },
    tapsToGrow: { type: Number, required: true },
    type: {type: String,  enum: ['crop', 'tree','bush'], required: true},
    price: { type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

export const Crop = mongoose.models.Crop || mongoose.model("Crop", CropSchema);
