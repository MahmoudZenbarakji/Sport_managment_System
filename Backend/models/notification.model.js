const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String },
    type: { type: String, enum: ["booking", "payment", "system", "other"], default: "other" },
    url: { type: String },  
    isRead: { type: Boolean, default: false },
    meta: { type: Object }, // optional
  }, { timestamps: true });
  
  module.exports = mongoose.model("Notification", NotificationSchema);
  