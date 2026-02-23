import { useEffect, useState } from "react";

const MyTenderBids = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [loadingBidders, setLoadingBidders] = useState(false);

  useEffect(() => {
    fetchMyTenders();
  }, []);

  const fetchMyTenders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/tenders/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (res.ok) setTenders(data.data);
  };

  const openTender = async (tender) => {
    setSelectedTender(tender);
    fetchBidders(tender.tenderId);
  };

  const fetchBidders = async (tenderId) => {
    const token = localStorage.getItem("token");
    setLoadingBidders(true);

    const res = await fetch(
      `http://localhost:5000/api/bidders/tender/${tenderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (res.ok) setBidders(data.data);

    setLoadingBidders(false);
  };

  const reviewBid = async (bidId, action) => {
    const token = localStorage.getItem("token");

    const remarks =
      action === "APPROVE" ? null : prompt("Enter remarks");

    const res = await fetch(
      `http://localhost:5000/api/bidders/${bidId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action, remarks }),
      }
    );

    if (res.ok) fetchBidders(selectedTender.tenderId);
  };

  const assignBidder = async (bidId) => {
    if (!window.confirm("Assign this bidder?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/bidders/${bidId}/assign`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      fetchBidders(selectedTender.tenderId);
      fetchMyTenders();
    }
  };

  const statusBadge = (status) => {
    const base =
      "text-xs font-medium px-2.5 py-1 rounded-full";

    switch (status) {
      case "CREATED":
        return `${base} bg-blue-50 text-blue-600`;
      case "REVIEWED":
        return `${base} bg-indigo-50 text-indigo-600`;
      case "REUPLOAD_REQUIRED":
        return `${base} bg-yellow-50 text-yellow-600`;
      case "ASSIGNED":
        return `${base} bg-green-50 text-green-600`;
      case "REJECTED":
        return `${base} bg-red-50 text-red-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            My Tender Bids
          </h2>

          {tenders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-gray-600">
              You have not created any tenders.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tenders.map((tender) => (
                <div
                  key={tender.tenderId}
                  onClick={() => openTender(tender)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <h3 className="font-medium text-gray-800">
                    {tender.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {tender.tenderId}
                  </p>
                  <div className="mt-3">
                    <span className={statusBadge(tender.status)}>
                      {tender.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedTender && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedTender(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {selectedTender.name}
            </h3>

            {loadingBidders ? (
              <p className="text-gray-500">Loading bidders...</p>
            ) : bidders.length === 0 ? (
              <p className="text-gray-500">No bids yet.</p>
            ) : (
              <div className="space-y-4">
                {bidders.map((bid) => (
                  <div
                    key={bid._id}
                    className="border border-gray-100 rounded-xl p-5 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium text-gray-800">
                        ₹ {bid.bidAmount}
                      </div>
                      <span className={statusBadge(bid.status)}>
                        {bid.status}
                      </span>
                    </div>

                    {bid.status === "CREATED" && (
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => reviewBid(bid._id, "APPROVE")}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reviewBid(bid._id, "REUPLOAD")}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Ask Reupload
                        </button>
                        <button
                          onClick={() => reviewBid(bid._id, "REJECT")}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {bid.status === "REVIEWED" && (
                      <button
                        onClick={() => assignBidder(bid._id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Assign Bidder
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-right">
              <button
                onClick={() => setSelectedTender(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MyTenderBids;