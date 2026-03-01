const router = require("express").Router();
const Controller = require("../controller/tender.controller");

router.post("/", Controller.createTender);
router.get("/", Controller.getAllTenders);
router.get("/my", Controller.getMyTenders)
router.get("/:tenderId", Controller.getTenderById);

module.exports = router;
