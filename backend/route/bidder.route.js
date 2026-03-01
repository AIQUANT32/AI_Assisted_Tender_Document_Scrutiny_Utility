const router = require("express").Router();
const Controller = require("../controller/bidder.controller");
const uploadDocs = require("../middleware/uploadDocs");

router.post("/",Controller.startSubmission);
router.post("/:id/complete",uploadDocs.array("files",10),Controller.completeSubmission);
router.post("/:id/review",Controller.reviewSubmission);
// router.post("/:tenderId/reupload",Controller.reUploadMissingDocs);
router.post("/:id/assign",Controller.assignBidder);
router.get("/myBids",Controller.getMybids);
router.get("/tender/:tenderId",Controller.getBidsByTender);
router.get("/:id",Controller.getBidById)

module.exports = router;