const tenderRepo = require("../repo/tender.repo");
const generateId = require("../utils/generateTenderId");

exports.createTender = async (data,userId) => {
    if(!data.expiryDate){
        throw new Error("Expiry date is required");
    }

    const expiry = new Date(data.expiryDate);

    if(expiry <= new Date()){
        throw new Error("Expiry date must be in the future");
    }

    const Id = await generateId(data.department);

    return await tenderRepo.createTender({
        ...data,
        tenderId : Id,
        createdBy : userId
    });
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