const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },

  description: String,

  category: String,

  images: [String],

  quantity: Number,
  unit: String,

  // BUY NOW
  buyNowPrice: { type: Number, default: null },

  // AUCTION
  basePrice: { type: Number, default: null },
  auctionStart: { type: Date, default: null },
  auctionEnd: { type: Date, default: null },

  currentHighestBid: {
    amount: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  isAuctionEnabled: { type: Boolean, default: false },
  isBuyNowEnabled: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ["active", "sold", "closed"],
    default: "active",
  },

  location: {
    state: String,
    city: String,
  },

  harvestDate: Date,
  expiryDate: Date,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
