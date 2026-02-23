const router = require("express").Router();
const Controller = require("../controller/tender.controller");

// Create Tender
router.post("/", Controller.createTender);

// Get All Tenders
router.get("/", Controller.getAllTenders);

router.get("/my", Controller.getMyTenders)

// Get Tender By ID
router.get("/:tenderId", Controller.getTenderById);

module.exports = router;
