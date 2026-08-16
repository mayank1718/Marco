import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
});

const Memory = mongoose.model("Memory", memorySchema);

export default Memory;