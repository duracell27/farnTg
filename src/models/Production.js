import mongoose, { Schema } from "mongoose";

const ProductionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    building: {
      name: {
        type: String,
        required: true,
      },
      img: { type: String, required: true },
      slots: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", default: null },
          tapsOnProduct: { type: Number, required: true, default: 0 },
          slotStatus: {
            type: String,
            enum: ["empty", "production", "ready"],
            required: true,
          },
        },
      ],
      type: { type: String, enum: ["bakery", "FeedMill"], required: true },
      price: { type: Number, required: true },
      lvl: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Production =
  mongoose.models.Production || mongoose.model("Production", ProductionSchema);
