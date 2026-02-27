const aiService = require("./ai.service")
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

  if(tender.createdBy.toString() === userId.toString()){
    throw new Error("Tender creator cannot bid on their own tender");
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

exports.completeSubmission = async (bidderId, files) => {
  const bidd = await bidderRepo.findById(bidderId);

  if (!bidd) {
    throw new Error("Submission not found");
  }

  if (bidd.status !== "PROCESSING") {
    throw new Error("Classification not allowed in current state");
  }

  const tender = await tenderRepo.getTenderById(bidd.tenderId);

  let foundSet = new Set();

  for (const file of files){
    const aiResult = await aiService.classifyDocuments(
      file.buffer,
      tender.requiredDocuments
    );
    console.log(aiResult);

    aiResult.data.found.forEach(doc => foundSet.add(doc));
  }

  const found = Array.from(foundSet);
  const missing = tender.requiredDocuments.filter(
    doc => !found.includes(doc)
  );

  return bidderRepo.updateById(bidderId, {
    requiredDocumentsFound: found,
    missingDocuments: missing,
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

    await tenderRepo.closeTender(
        bidder.tenderId,
        "CLOSED",
        closedAt
    )

    return {message : "Bidder Assigned Successfully"};
};

exports.getMyBids = async (userId) => {
  return bidderRepo.findByBidder(userId);
};

exports.getBidById = async (bidId, userId) => {
  const bid = await bidderRepo.findById(bidId);

  if(!bid){
    throw new Error("Bid not found");
  }

  if(bid.bidderId.toString() !== userId.toString()){
    throw new Error("Unauthorized");
  }

  return bid;
}

exports.getBidsByTender = async (tenderId) => {
  return bidderRepo.findByTender(tenderId);
}