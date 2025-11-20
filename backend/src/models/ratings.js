const ratingSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  raterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

  rating: { type: Number, min: 1, max: 5 },
  comment: String,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Rating", ratingSchema);
