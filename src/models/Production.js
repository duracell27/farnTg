import mongoose, { Schema } from "mongoose";

const ProductionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buildings: [{
      type: Schema.Types.ObjectId,
      ref: "ProductionBuildings",
    }],
  },
  {
    timestamps: true,
  }
);

export const Production =
  mongoose.models.Production || mongoose.model("Production", ProductionSchema);
