const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtAdd: Number, // to prevent price change issues
    }
  ],

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Cart", cartSchema);
