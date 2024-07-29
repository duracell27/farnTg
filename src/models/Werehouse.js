import mongoose, { Schema } from "mongoose";

const werehouseSiloSchema = new Schema({
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

const werehouseWerehouseSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
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
    silo: [werehouseSiloSchema],
    werehouse: [werehouseWerehouseSchema]
  },
  {
    timestamps: true,
  }
);

export const Werehouse =
  mongoose.models.Werehouse || mongoose.model("Werehouse", werehouseSchema);
