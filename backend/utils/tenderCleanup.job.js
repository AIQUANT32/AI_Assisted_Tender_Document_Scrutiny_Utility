const cron = require("node-cron");
const Tender = require("../model/tender.model");

const deleteOldClosedTenders = async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const result = await Tender.deleteMany({
      status: "CLOSED",
      closedAt: { $lt: oneDayAgo }
    });

    if (result.deletedCount > 0) {
      console.log(`${result.deletedCount} old tenders deleted`);
    }

  } catch (error) {
    console.error("Tender cleanup job failed:", error.message);
  }
};

// Run every hour
const startTenderCleanupJob = () => {
  cron.schedule("0 * * * *", async () => {
    await deleteOldClosedTenders();
  });
};

module.exports = startTenderCleanupJob;