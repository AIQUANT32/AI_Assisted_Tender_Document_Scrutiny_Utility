import { useEffect, useState } from "react";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/bidders/myBids", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) setBids(data.data);
  };

  const openBidModal = async (bidId) => {
    const token = localStorage.getItem("token");
    setLoadingDetails(true);

    const res = await fetch(`http://localhost:5000/api/bidders/${bidId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) setSelectedBid(data.data);

    setLoadingDetails(false);
  };

  const closeModal = () => {
    setSelectedBid(null);
  };

  const statusBadge = (status) => {
    const base = "text-xs font-medium px-2.5 py-1 rounded-full";

    switch (status) {
      case "PROCESSING":
        return `${base} bg-yellow-50 text-yellow-600`;
      case "CREATED":
        return `${base} bg-blue-50 text-blue-600`;
      case "REVIEWED":
        return `${base} bg-indigo-50 text-indigo-600`;
      case "REUPLOAD_REQUIRED":
        return `${base} bg-orange-50 text-orange-600`;
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
          <h2 className="text-2xl font-semibold text-gray-800">My Bids</h2>

          {bids.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-gray-600">
              No bids submitted.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bids.map((bid) => (
                <div
                  key={bid._id}
                  onClick={() => openBidModal(bid._id)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-800">
                      {bid.tenderId}
                    </div>
                    <span className={statusBadge(bid.status)}>
                      {bid.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    ₹ {bid.bidAmount}
                  </div>

                  {bid.missingDocuments?.length > 0 && (
                    <div className="mt-3 text-xs text-red-500">
                      Missing: {bid.missingDocuments.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedBid && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Bid Details
            </h3>

            {loadingDetails ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>Tender ID:</strong> {selectedBid.tenderId}
                </div>

                <div>
                  <strong>Bid Amount:</strong> ₹ {selectedBid.bidAmount}
                </div>

                <div>
                  <strong>Status:</strong>{" "}
                  <span className={statusBadge(selectedBid.status)}>
                    {selectedBid.status}
                  </span>
                </div>

                <div>
                  <strong>Documents Found:</strong>{" "}
                  {selectedBid.requiredDocumentsFound?.length > 0
                    ? selectedBid.requiredDocumentsFound.join(", ")
                    : "None"}
                </div>

                <div>
                  <strong>Missing Documents:</strong>{" "}
                  {selectedBid.missingDocuments?.length > 0
                    ? selectedBid.missingDocuments.join(", ")
                    : "None"}
                </div>

                <div>
                  <strong>Manual Review Remarks:</strong>{" "}
                  {selectedBid.manualReviewRemarks || "None"}
                </div>

                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedBid.createdAt).toLocaleString()}
                </div>

                <div>
                  <strong>Reviewed At:</strong>{" "}
                  {selectedBid.reviewedAt
                    ? new Date(selectedBid.reviewedAt).toLocaleString()
                    : "Not Reviewed"}
                </div>
              </div>
            )}

            <div className="mt-8 text-right">
              <button
                onClick={closeModal}
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

export default MyBids;
