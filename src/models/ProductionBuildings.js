import mongoose, { Schema } from "mongoose";

const ProductionBuildingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: { type: String, required: true },
    slots: [{type: Schema.Types.ObjectId, ref: "Product"}],
    type: {type: String,  enum: ['bakery'], required: true},
    price: { type: Number, required: true},
    lvl: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

export const ProductionBuildings = mongoose.models.ProductionBuildings || mongoose.model("ProductionBuildings", ProductionBuildingSchema);
