const Bidder = require("../model/bidder.model");


exports.create = (data) => {
  return Bidder.create(data);
};

exports.findByTenderAndBidder = (tenderId, bidderId) => {
  return Bidder.findOne({ tenderId, bidderId });
};

exports.findById = (id) => {
  return Bidder.findById(id);
};

exports.updateById = (id, updateData) => {
  return Bidder.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
};

exports.updateClassification = (
  id,
  requiredDocumentsFound,
  missingDocuments
) => {
  return Bidder.findByIdAndUpdate(
    id,
    {
      requiredDocumentsFound,
      missingDocuments
    },
    { new: true }
  );
};

exports.updateStatus = (id, status) => {
  return Bidder.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

exports.addManualReview = (id, status,remarks=null) => {
  return Bidder.findByIdAndUpdate(
    id,
    {
      manualReviewRemarks: remarks,
      reviewedAt: new Date(),
      status,
    },
    { new: true }
  );
};

exports.findByBidder = (bidderId) => {
  return Bidder.find({ bidderId })
    .sort({ createdAt: -1 });
};

exports.findByTender = (tenderId) => {
  return Bidder.find({ tenderId })
    .sort({ createdAt: -1 });
};
