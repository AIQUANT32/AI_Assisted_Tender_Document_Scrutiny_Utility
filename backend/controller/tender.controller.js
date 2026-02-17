const tenderService = require("../service/tender.service");

// Create Tender
exports.createTender = async (req, res) => {
  try {
    const tender = await tenderService.createTender(
      req.body
    );

    res.status(201).json(tender);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get All Tenders
exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await tenderService.getAllTenders();

    res.status(200).json(tenders);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get Tender By ID
exports.getTenderById = async (req, res) => {
  try {
    const tender = await tenderService.getTenderById(req.params.id);

    res.status(200).json(tender);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
