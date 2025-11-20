const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number,
    }
  ],

  totalAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "packed", "shipped", "delivered"],
    default: "pending",
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
