const Tender = require("../model/tender.model");

exports.createTender = (data) => {
    return Tender.create(data);
};

exports.getAllTenders = (userId) => {
    return Tender.find({
        createdBy: {$ne: userId}
    }).sort({ createdAt: -1 });
};


exports.getTenderById = (tenderId) => {
    return Tender.findOne({tenderId});
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

exports.countTenderByDepartment = (regexPattern,department) => {
    return Tender.countDocuments({ 
        tenderId: {$regex: regexPattern},
        department
  });
}

exports.closeTender = (tenderId, status, closedAt) => {
    return Tender.findByIdAndUpdate(
        {tenderId},
        { status },
        {closedAt},
        { new: true }
    );
};
