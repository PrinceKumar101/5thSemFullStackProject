const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  type: String, // "bid", "auction_end", "order", etc.

  title: String,
  message: String,

  meta: { type: Object }, // flexible field

  read: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
