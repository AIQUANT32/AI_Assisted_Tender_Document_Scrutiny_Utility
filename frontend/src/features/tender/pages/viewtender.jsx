import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import "../../../styles/global.css";

const ViewTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <OrbitProgress dense color="#4931cc" size="medium" text="" textColor="" />;
  }

  return (
    <div className="page-container">
      <div className="list-card">
        <h2>All Tenders</h2>

        {tenders.length === 0 ? (
          <p>No tenders found.</p>
        ) : (
          <div className="tender-grid">
            {tenders.map((tender) => (
              <div key={tender._id} className="tender-item">
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
                    <strong>Expiry:</strong>{" "}
                    {new Date(tender.expiryDate).toLocaleString()}
                  </div>

                  <div>
                    <strong>Documents:</strong>{" "}
                    {tender.requiredDocuments.join(", ")}
                  </div>
                  <div>
                    <strong>Department:</strong> {tender.department}
                  </div>
                  <div>
                    <strong>Organisation:</strong> {tender.organisationName}
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
