import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
