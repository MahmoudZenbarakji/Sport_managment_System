const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      currency: {
        type: String,
        default: "USD"
      },
      status: {
        type: String,
        enum: ["pending", "success", "failed", "refunded"],
        default: "pending"
      },
      paymentMethod: {
        type: String,
        required: true
      },
      transactionId: {
        type: String,
        required: true
      },
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order" // or Booking, Subscription
      },
      receiptUrl: {
        type: String
      },
      paidAt: {
        type: Date
      },
      refund: {
        refunded: { type: Boolean, default: false },
        refundId: { type: String },
        refundedAt: { type: Date }
      },

});

const Payment = mongoose.model('Payment', paymentSchema);