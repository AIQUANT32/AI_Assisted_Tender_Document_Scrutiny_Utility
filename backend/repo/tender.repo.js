const Tender = require("../model/tender.model");

exports.createTender = (data) => {
    return Tender.create(data);
};

exports.getAllTenders = () => {
    return Tender.find().sort({ createdAt: -1 });
};


exports.getTenderById = (id) => {
    return Tender.findById(id);
};

exports.updateTenderStatus = (id, status) => {
    return Tender.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
};

exports.countActiveTenders = () => {
    return Tender.countDocuments({ status: "ACTIVE" });
};
