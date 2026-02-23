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
    <div className="h-full flex flex-col bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Tender
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Tender Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tender Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition bg-white"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Organisation Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Organisation Name
            </label>
            <input
              type="text"
              name="organisationName"
              value={form.organisationName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Required Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Required Documents
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {documentOptions.map((doc) => (
                <label
                  key={doc}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50
                             px-3 py-2 rounded-lg border border-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.requiredDocuments.includes(doc)}
                    onChange={() => toggleDocument(doc)}
                    className="accent-indigo-600"
                  />
                  {doc}
                </label>
              ))}
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expiry Date
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700
                         text-white text-sm font-medium
                         py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Tender"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTender;