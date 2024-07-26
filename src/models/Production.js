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
      slots: [{type: Schema.Types.ObjectId, ref: "Product"}],
      type: {type: String,  enum: ['bakery', 'FeedMill'], required: true},
      price: { type: Number, required: true},
      lvl: {type: Number, required: true}
    },
  },
  {
    timestamps: true,
  }
);

export const Production =
  mongoose.models.Production || mongoose.model("Production", ProductionSchema);
