const router = require("express").Router();
const Controller = require("../controller/bidder.controller");

router.post("/",Controller.startSubmission);
router.post("/:id/complete",Controller.completeSubmission);
router.post("/:id/review",Controller.reviewSubmission);
router.post("/:tenderId/reupload",Controller.reUploadMissingDocs);
router.post("/:id/assign",Controller.assignBidder);
router.get("/myBids",Controller.getMybids);
router.get("/tender/:tenderId",Controller.getBidsByTender);

module.exports = router;