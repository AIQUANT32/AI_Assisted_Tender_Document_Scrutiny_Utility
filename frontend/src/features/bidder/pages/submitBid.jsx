import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SubmitBid = () => {
  const { tenderId } = useParams();

  const [bidAmount, setBidAmount] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [requiredDocs, setRequiredDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch tender details
  useEffect(() => {
    const fetchTender = async () => {
      const res = await fetch(
        `http://localhost:5000/api/tenders/${tenderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        setRequiredDocs(data.requiredDocuments || []);
      }
    };

    fetchTender();
  }, [tenderId]);

  const handleSubmit = async () => {
    if (!bidAmount) {
      alert("Bid amount is required");
      return;
    }

    if (!selectedFile) {
      alert("Please upload document");
      return;
    }

    setLoading(true);

    try {
      // Create Bid
      const createRes = await fetch(
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

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.message);
      }

      const bidId = createData.data._id;

      // Upload Docs
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("bidId", bidId);

      const uploadRes = await fetch(
        "http://localhost:5000/api/bidders/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.message);
      }

      alert("Bid submitted successfully");

      setBidAmount("");
      setSelectedFile(null);

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

        <div className="space-y-8">

          {/* Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bid Amount
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Required Documents Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Required Documents for This Tender
            </h3>

            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-2">
              {requiredDocs.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No required documents defined.
                </div>
              ) : (
                requiredDocs.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between text-sm text-gray-700"
                  >
                    <span>{doc}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upload Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Upload Tender Documents (PDF)
            </label>

            <div className="relative h-48 rounded-lg border-2 border-indigo-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300">

              <div className="absolute flex flex-col items-center pointer-events-none">
                <img
                  alt="File Icon"
                  className="mb-3"
                  src="https://img.icons8.com/dusk/64/000000/file.png"
                />
                <span className="block text-gray-500 font-semibold">
                  Drag & drop your file here
                </span>
                <span className="block text-gray-400 font-normal mt-1">
                  or click to upload
                </span>
              </div>

              <input
                type="file"
                accept="application/pdf"
                className="h-full w-full opacity-0 cursor-pointer"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>

            {selectedFile && (
              <div className="text-sm text-gray-600 mt-2">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-2.5 rounded-lg transition
                       disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Create Bid"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SubmitBid;