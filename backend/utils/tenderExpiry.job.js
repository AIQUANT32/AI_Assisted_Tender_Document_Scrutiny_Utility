const cron = require("node-cron");
const Tender = require("../model/tender.model");

const closeExpiredTenders = async () => {
  try {
    const now = new Date();

    const result = await Tender.updateMany(
      {
        status: "ACTIVE",
        expiryDate: { $lt: now }
      },
      {
        status: "CLOSED",
        closedAt : new Date()
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`${result.modifiedCount} tenders closed`);
    }

  } catch (error) {
    console.error("Tender expiry job failed:", error.message);
  }
};

// Run every 1 minute
const startTenderExpiryJob = () => {
  cron.schedule("* * * * *", async () => {
    await closeExpiredTenders();
  });
};

module.exports = startTenderExpiryJob;
