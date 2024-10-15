import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      minLength: [2, "Name must contain atleast 2 charracters"],
    },

    subject: {
      type: String,
      minLength: [2, "Subject must contain atleast 2 charracters"],
    },

    message: {
      type: String,
      minLength: [2, "Message must contain atleast 2 charracters"],
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);