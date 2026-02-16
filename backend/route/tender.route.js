const router = require("express").Router();
const Controller = require("../controller/tender.controller");

// Create Tender
router.post("/", Controller.createTender);

// Get All Tenders
router.get("/", Controller.getAllTenders);

// Get Tender By ID
router.get("/:id", Controller.getTenderById);

module.exports = router;
