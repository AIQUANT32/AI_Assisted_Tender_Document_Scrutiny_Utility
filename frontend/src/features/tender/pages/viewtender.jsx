import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

const ViewTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTender, setSelectedTender] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTenders();
    const interval = setInterval(fetchTenders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTenders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tenders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setTenders(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTenders = tenders
    .filter((tender) => {
      const matchesSearch =
        tender.name.toLowerCase().includes(search.toLowerCase()) ||
        tender.tenderId.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment = department
        ? tender.department === department
        : true;

      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "expiry") {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      }
      return 0;
    });

  const statusBadge = (status) => {
    const base = "text-xs font-medium px-2.5 py-1 rounded-full";

    return status === "ACTIVE"
      ? `${base} bg-green-50 text-green-600`
      : `${base} bg-red-100 text-red-600`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <OrbitProgress dense color="#4f46e5" size="medium" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Tenders</h2>

          {/* Controls */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Departments</option>
              <option value="Public Works Department">Public Works Department</option>
              <option value="Urban Development Department">Urban Development Department</option>
              <option value="Health Department">Health Department</option>
              <option value="Education Department">Education Department</option>
              <option value="Energy Department">Energy Department</option>
              <option value="Transport Department">Transport Department</option>
              <option value="IT Department">IT Department</option>
              <option value="Procurement Department">Procurement Department</option>
              <option value="Municipal Corporation">Municipal Corporation</option>
              <option value="Infrastructure Development Corporation">Infrastructure Development Corporation</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="newest">Newest</option>
              <option value="expiry">Expiry Date</option>
            </select>
          </div>

          {/* Tender Grid */}
          {filteredTenders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-gray-600">
              No tenders found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map((tender) => (
                <div
                  key={tender.tenderId}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{tender.name}</h3>
                    <span className={statusBadge(tender.status)}>
                      {tender.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                    {tender.description}
                  </p>

                  <div className="mt-4 text-sm text-gray-500 space-y-1">
                    <div>ID: {tender.tenderId}</div>
                    <div>
                      Expiry: {new Date(tender.expiryDate).toLocaleString()}
                    </div>
                    <div>{tender.department}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedTender(tender)}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      View Details
                    </button>

                    {tender.status === "ACTIVE" && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/tenders/${tender.tenderId}/bid`)
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Bid
                      </button>
                    )}
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

            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <strong>ID:</strong> {selectedTender.tenderId}
              </div>
              <div>
                <strong>Status:</strong> {selectedTender.status}
              </div>
              <div>
                <strong>Department:</strong> {selectedTender.department}
              </div>
              <div>
                <strong>Organisation:</strong> {selectedTender.organisationName}
              </div>
              <div>
                <strong>Description:</strong> {selectedTender.description}
              </div>
              <div>
                <strong>Required Documents:</strong>{" "}
                {selectedTender.requiredDocuments.join(", ")}
              </div>
              <div>
                <strong>Expiry:</strong>{" "}
                {new Date(selectedTender.expiryDate).toLocaleString()}
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(selectedTender.createdAt).toLocaleString()}
              </div>
            </div>

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

export default ViewTenders;
