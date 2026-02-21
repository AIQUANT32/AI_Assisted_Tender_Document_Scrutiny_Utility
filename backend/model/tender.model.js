const mongoose = require("mongoose");

const TenderSchema = new mongoose.Schema(
  {
    tenderId: {
      type: String,
      required: true,
      unique: true,
      immutable : true,
    },
    
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requiredDocuments: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one document is required.",
      },
    },

    department: {
      type: String,
      required: true,
      enum: [
        "Public Works Department",
        "Urban Development Department",
        "Health Department",
        "Education Department",
        "Energy Department",
        "Transport Department",
        "IT Department",
        "Procurement Department",
        "Municipal Corporation",
        "Infrastructure Development Corporation",
      ],
    },

    organisationName: {
      type: String,
      required: true,
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CLOSED"],
      default: "ACTIVE",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

TenderSchema.methods.isExpired = function () {
  return new Date() > this.expiryDate;
};

module.exports = mongoose.model("Tender", TenderSchema);
