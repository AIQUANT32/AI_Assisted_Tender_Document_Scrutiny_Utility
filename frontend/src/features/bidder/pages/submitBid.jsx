import { useState } from "react";
import { useParams } from "react-router-dom";

const SubmitBid = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [documentsInput, setDocumentsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { tenderId } = useParams();

  const handleSubmit = async () => {
    if (!bidAmount) {
      alert("Bid amount is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    setLoading(true);

    try {
      const startRes = await fetch(
        "http://localhost:5000/api/bidders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ tenderId, bidAmount })
        }
      );

      const startData = await startRes.json();

      if (!startRes.ok) {
        throw new Error(startData.message || "Failed to create bid");
      }

      const bidId = startData.data?._id;
      if (!bidId) {
        throw new Error("Invalid server response");
      }

      const identifiedDocs = documentsInput
        .split(",")
        .map(d => d.trim())
        .filter(Boolean);

      const completeRes = await fetch(
        `http://localhost:5000/api/bidders/${bidId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ identifiedDocs })
        }
      );

      const completeData = await completeRes.json();

      if (!completeRes.ok) {
        throw new Error(completeData.message || "Classification failed");
      }

      alert("Bid submitted successfully");

      setBidAmount("");
      setDocumentsInput("");

    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-full flex items-start justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Submit Bid
        </h2>

        <div className="space-y-6">

          {/* Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bid Amount
            </label>
            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Documents Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Identified Documents
            </label>
            <input
              type="text"
              placeholder="e.g. PAN, GST_CERTIFICATE"
              value={documentsInput}
              onChange={(e) => setDocumentsInput(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter document types separated by commas.
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white text-sm font-medium
                       py-2.5 rounded-lg transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SubmitBid;