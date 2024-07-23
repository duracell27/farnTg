import mongoose, { Schema } from "mongoose";

const werehouseObjSchema = new Schema({
  crop: {
    type: Schema.Types.ObjectId,
    ref: "Crop",
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const werehouseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    silo: [werehouseObjSchema],
  },
  {
    timestamps: true,
  }
);

export const Werehouse =
  mongoose.models.Werehouse || mongoose.model("Werehouse", werehouseSchema);
