import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
{
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  participantsKey: {
    type: String,
  },
  deletedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{ timestamps: true }
);

conversationSchema.index({ participantsKey: 1 }, { unique: true, sparse: true });

conversationSchema.pre("deleteOne", { document: false, query: true }, function (next) {
  const convoId = this.getFilter()._id;
  if (convoId) {
    mongoose.model("Notification").deleteMany({ conversation: convoId, type: "message" })
      .then(() => next())
      .catch(next);
  } else {
    next();
  }
});

export default mongoose.model("Conversation", conversationSchema);
