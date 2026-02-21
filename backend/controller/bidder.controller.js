const bidderService = require("../service/bidder.service");

exports.startSubmission = async (req,res) => {
    try{
        const result = await bidderService.startSubmission(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success : true,
            data : result
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message : err.message
        });
    }
};

exports.completeSubmission = async (req,res) => {
    try{
        const {id} = req.params;
        const {identifiedDocs} = req.body;

        const result = await bidderService.completeSubmission(
            id,
            identifiedDocs
        );

        res.status(200).json({
            success : true,
            data: result
        });
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        });
    }
};

exports.reviewSubmission = async(req,res) => {
    try{
        const {id} = req.params;
        const {action,remarks} = req.body;

        const result = await bidderService.reviewSubmission(
            id,
            action,
            remarks
        );

        res.status(200).json({
            success : true,
            data : result
        });
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        });
    }
};

exports.reUploadMissingDocs = async(req,res) => {
    try{
        const {tenderId} = req.params;
        const {newIdentifiedDocs} = req.body;

        const result = await bidderService.reUploadMissingDocs(
            tenderId,
            req.user.id,
            newIdentifiedDocs
        );

        res.status(200).json({
            success : true,
            data : result
        });
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

exports.assignBidder = async(req,res) => {
    try{
        const {id} = req.params;

        const result = await bidderService.assignBidder(id);

        res.status(200).json({
            success : true,
            data : result
        });
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : err.message,
        });
    }
};

exports.getMybids = async(req,res) => {
    try{
        const {id} = req.params;

        const result = await bidderService.getMyBids(id);

        res.status(200).json({
            success : true,
            data : result
        })
    }
    catch(err){
        res.status(400).status({
            success : false,
            message : err.message,
        });
    }
};

exports.getBidsByTender = async (req, res) => {
  try {
    const { tenderId } = req.params;

    const result = await bidderService.getBidsByTender(tenderId);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
