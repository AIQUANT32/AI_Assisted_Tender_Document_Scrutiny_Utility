import { useState } from "react";
import { useNavigate } from "react-router-dom";

const documentOptions = [
  "PAN",
  "GST_CERTIFICATE",
  "ITR",
  "BALANCE_SHEET",
  "WORK_ORDER",
  "EMD_RECEIPT",
];

const departments = [
  "Public Works Department",
  "Urban Development Department",
  "Health Department",
  "Education Department",
  "Energy Department",
  "Transport Department",
  "IT Department",
  "Procurement Department",
  "Municipal Corporation",
  "Infrastructure Development Corporation",
];

const CreateTender = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    department: "",
    organisationName: "",
    requiredDocuments: [],
    expiryDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleDocument = (doc) => {
    const updated = form.requiredDocuments.includes(doc)
      ? form.requiredDocuments.filter((d) => d !== doc)
      : [...form.requiredDocuments, doc];

    setForm({ ...form, requiredDocuments: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.requiredDocuments.length === 0) {
      alert("Select at least one document.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tenders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating tender");
      }

      alert("Tender created successfully.");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Create Tender</h2>

        <form onSubmit={handleSubmit}>
          <label>Tender Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <label>Organisation Name</label>
          <input
            type="text"
            name="organisationName"
            value={form.organisationName}
            onChange={handleChange}
            required
          />

          <label>Required Documents</label>
          <div className="checkbox-group">
            {documentOptions.map((doc) => (
              <label key={doc} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={form.requiredDocuments.includes(doc)}
                  onChange={() => toggleDocument(doc)}
                />
                {doc}
              </label>
            ))}
          </div>

          <label>Expiry Date</label>
          <input
            type="datetime-local"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Tender"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTender;
