const tenderService = require("../service/tender.service");

// Create Tender
exports.createTender = async (req, res) => {
  try {
    const tender = await tenderService.createTender(
      req.body,
      req.user.id
    );

    res.status(201).json(tender);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get All Tenders
exports.getAllTenders = async (req, res) => {
  try {
    const userId = req.user.id;
    const tenders = await tenderService.getAllTenders(userId);

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

exports.getMyTenders = async (req, res) => {
  try {
    const tenders = await tenderService.getByCreator(req.user.id);
    console.log(req.user.id)

    res.status(200).json({
      success: true,
      data: tenders
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
