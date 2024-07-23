import mongoose, { Schema } from "mongoose";

const fieldObjSchema = new Schema({
  crop: {
    type: Schema.Types.ObjectId,
    ref: "Crop",
    default: null,
  },
  tapsOnField: {
    type: Number,
    default: 0,
  },
  status: { type: String, enum: ["empty", "grow", "ready"], required: true },
});

const fieldSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fields: [fieldObjSchema],
  },
  {
    timestamps: true,
  }
);

export const Field =
  mongoose.models.Field || mongoose.model("Field", fieldSchema);
