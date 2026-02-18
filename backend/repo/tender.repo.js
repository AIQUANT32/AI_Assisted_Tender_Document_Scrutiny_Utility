const Tender = require("../model/tender.model");

exports.createTender = (data) => {
    return Tender.create(data);
};

exports.getAllTenders = () => {
    return Tender.find().sort({ createdAt: -1 });
};


exports.getTenderById = (tenderId) => {
    return Tender.findById({tenderId});
};

exports.updateTenderStatus = (tenderId, status) => {
    return Tender.findByIdAndUpdate(
        {tenderId},
        { status },
        { new: true }
    );
};

exports.countActiveTenders = () => {
    return Tender.countDocuments({ status: "ACTIVE" });
};

exports.countTenderByDepartment = (tenderId,department) => {
    return Tender.countDocuments({ 
        tenderId,
        department
  });
}
