import mongoose, { Schema } from "mongoose";

const needSchema = new Schema({
  crop: { type: Schema.Types.ObjectId, ref: "Crop" },
  amount: { type: Number, required: true },
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: { type: String, required: true },
    tapsToProduce: { type: Number, required: true },
    needs: [needSchema],
    productFor: { type: String, enum: ["bakery"], required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
