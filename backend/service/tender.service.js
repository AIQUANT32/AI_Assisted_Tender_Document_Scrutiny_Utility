const tenderRepo = require("../repo/tender.repo");

exports.createTender = async (data, userId) => {
    if(!data.expiryDate){
        throw new Error("Expiry date is required");
    }

    const expiry = new Date(data.expiryDate);

    if(expiry <= newDate()){
        throw new Error("Expiry date must be in the future");
    }

    const tenderData = {
        ...data,
        createdBy : userId
    };

    return await tenderRepo.createTender(tenderData);
}

exports.getAllTenders = async() => {
    return await tenderRepo.getAllTenders();
}

exports.getTenderById = async (id) => {
    const tender = await tenderRepo.getTenderById(id);

    if(!tender){
        throw new Error("Tender not found");
    }

    if(tender.status === "ACTIVE" && new Date() > tender.expiryDate){
        await tenderRepo.updateTenderStatus(id,"CLOSED");
        tender.status = "CLOSED";
    }

    return tender;
};