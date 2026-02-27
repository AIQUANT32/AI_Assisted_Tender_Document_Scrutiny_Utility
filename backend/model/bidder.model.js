const mongoose = require("mongoose");

const BidderSchema = new mongoose.Schema(
  {
    bidderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tenderId: {
      type: String,
      required: true,
    },

    requiredDocumentsFound: {
      type: [String],
      default : [],
    },

    missingDocuments : {
      type : [String],
      default : [],
    },

    bidAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PROCESSING",
        "CREATED",
        "REVIEWED",
        "ASSIGNED",
        "REJECTED"
      ],
      default: "PROCESSING"
    },

    manualReviewRemarks : {
      type : String,
      default : null
    },

    reviewedAt : {
      type : Date,
      default : null,
    }
  },
  { timestamps: true },
);

BidderSchema.index({tenderId:1, bidderId:1}, {unique:true});
module.exports = mongoose.model("Bidder",BidderSchema);
