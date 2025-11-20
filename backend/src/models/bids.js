const bidSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },

  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Bid", bidSchema);
