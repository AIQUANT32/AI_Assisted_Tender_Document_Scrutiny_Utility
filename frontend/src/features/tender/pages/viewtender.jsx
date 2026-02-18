import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import "../../../styles/global.css";

const ViewTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tenders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setTenders(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <OrbitProgress dense color="#4931cc" size="medium" text="" textColor="" />
    );
  }

  const filteredTenders = tenders
    .filter((tender) => {
      const matchesSearch = tender.name
        .toLowerCase()
        .includes(search.toLowerCase());

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

  console.log(tenders.map((t) => t.tenderId));

  return (
    <div className="page-container">
      <div className="list-card">
        <h2>All Tenders</h2>
        <div className="tender-controls">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Public Works Department">
              Public Works Department
            </option>
            <option value="IT Department">IT Department</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="expiry">Expiry Date</option>
          </select>
        </div>

        {tenders.length === 0 ? (
          <p>No tenders found.</p>
        ) : (
          <div className="tender-grid">
            {filteredTenders.map((tender) => (
              <div key={tender.tenderId || tender._id} className="tender-item">
                <div className="tender-header">
                  <h3>{tender.name}</h3>
                  <span
                    className={`status-badge ${
                      tender.status === "ACTIVE" ? "active" : "closed"
                    }`}
                  >
                    {tender.status}
                  </span>
                </div>

                <p className="tender-desc">{tender.description}</p>

                <div className="tender-meta">
                  <div>
                    <strong>Id:</strong> {tender.tenderId}
                  </div>

                  <div>
                    <strong>Expiry:</strong>{" "}
                    {new Date(tender.expiryDate).toLocaleString()}
                  </div>
                  <div>
                    <strong>Department:</strong> {tender.department}
                  </div>
                  <div>
                    <strong>Organisation:</strong> {tender.organisationName}
                  </div>
                  <div>
                    <strong>Documents:</strong>{" "}
                    {tender.requiredDocuments.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTenders;
