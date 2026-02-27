const multer = require("multer");

const storage = multer.memoryStorage();

const uploadDocs = multer({
    storage,
    limits : {
        fileSize : 20 * 1024 * 1024
    }
});

module.exports = uploadDocs;