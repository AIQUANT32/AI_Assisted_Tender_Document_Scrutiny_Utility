const bidderRepo = require("../repo/bidder.repo");
const tenderRepo = require("../repo/tender.repo");

exports.startSubmission = async (data, userId) => {
  const { tenderId, bidAmount } = data;

  const tender = await tenderRepo.getTenderById(tenderId);
  if (!tender) {
    throw new Error("Tender Doesn't Exist");
  }
  if (tender.status !== "ACTIVE") {
    throw new Error("Tender is Closed");
  }

  const bidExists = await bidderRepo.findByTenderAndBidder(tenderId, userId);
  if (bidExists) {
    throw new Error("Submission already exists for this Tender");
  }

  return bidderRepo.create({
    bidderId: userId,
    tenderId,
    bidAmount,
    status: "PROCESSING",
  });
};

exports.completeSubmission = async (bidderId, identifiedDocs) => {
  const bidder = await bidderRepo.findById(bidderId);

  if (!bidder) {
    throw new Error("Submission not found");
  }

  if (bidder.status !== "PROCESSING") {
    throw new Error("Classification not allowed in current state");
  }

  const tender = await tenderRepo.getTenderById(bidder.tenderId);

  const requiredDocs = tender.requiredDocuments;
  const missingDocs = requiredDocs.filter(
    (doc) => !identifiedDocs.includes(doc),
  );

  return bidderRepo.updateById(bidderId, {
    requiredDocumentsFound: identifiedDocs,
    missingDocuments: missingDocs,
    status: "CREATED",
  });
};

exports.reviewSubmission = async(id,action,remarks = null) => {
    const bidder = await bidderRepo.findById(id);

    if(!bidder){
        throw new Error ("Submission not found");
    }

    if(bidder.status !=="CREATED"){
        throw new Error ("Review not allowed in current state");
    };

    if(action === "APPROVE"){
        return bidderRepo.addManualReview(
            id,
            "REVIEWED",
            null
        );
    }

    if(action === "REUPLOAD"){
        return bidderRepo.addManualReview(
            id,
            "REUPLOAD_REQUIRED",
            remarks
        );
    }

    if(action === "REJECT"){
        return bidderRepo.addManualReview(
            id,
            "REJECTED",
            remarks
        );
    }

    throw new Error("Invalid review action");
}

exports.reUploadMissingDocs = async (tenderId, userId, newIdentifiedDocs) => {
  const bidder = await bidderRepo.findByTenderAndBidder(tenderId, userId);

  if (!bidder) {
    throw new Error("Submission not found");
  }

  if (bidder.status !== "REUPLOAD_REQUIRED") {
    throw new Error("Re-upload not allowed");
  }

  await bidderRepo.updateStatus(bidder._id,"PROCESSING");

  const tender = await tenderRepo.getTenderById(tenderId);

  const updatedFound = [
    ...new Set([...bidder.requiredDocumentsFound, ...newIdentifiedDocs]),
  ];

  const updatedMissing = tender.requiredDocuments.filter(
    (docs) => !updatedFound.includes(doc),
  );

  return bidderRepo.updateById(bidder._id,{
    requiredDocumentsFound: updatedFound,
    missingDocuments: updatedMissing,
    status: "CREATED"
  });
};

exports.assignBidder = async (bidderId) => {
    const bidder = await bidderRepo.findById(bidderId);

    if(!bidder){
        throw new Error ("Submission not found");
    }

    if(bidder.status !== "REVIEWED"){
        throw new Error("Only reviewed bidders can be assigned the tender");
    }

    await bidderRepo.updateStatus(bidderId, "ASSIGNED");

    const allBidders = await bidderRepo.findByTender(
        bidder.tenderId
    );

    for(const b of allBidders){
        if(b._id.toString() !== bidderId.toString()){
            await bidderRepo.updateStatus(b._id,"REJECTED");
        }
    }

    await tenderRepo.updateTenderStatus(
        bidder.tenderId,
        "CLOSED"
    )

    return {message : "Bidder Assigned Successfully"};
};

exports.getMyBids = async (userId) => {
  return bidderRepo.findByBidder(userId);
};

exports.getBidsByTender = async (tenderId) => {
  return bidderRepo.findByTender(tenderId);
}