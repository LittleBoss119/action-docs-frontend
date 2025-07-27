import { useState, useEffect } from "react";

const ActionFormModal = ({ onClose, onSave, existing }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    method: "",
    domain: "",
    endpoint: "",
    keyword: [""],
    requestParameters: [""],
    responseParameters: [""],
    exampleRequest: {},
    exampleResponse: {},
  });

  const [exampleRequestText, setExampleRequestText] = useState("{}");
  const [exampleResponseText, setExampleResponseText] = useState("{}");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setFormData({
        ...existing,
        keyword: existing.keyword?.length ? existing.keyword : [""],
        requestParameters: existing.requestParameters?.length ? existing.requestParameters : [""],
        responseParameters: existing.responseParameters?.length ? existing.responseParameters : [""],
        exampleRequest: existing.exampleRequest || {},
        exampleResponse: existing.exampleResponse || {},
      });

      setExampleRequestText(
        JSON.stringify(existing.exampleRequest || {}, null, 2)
      );
      setExampleResponseText(
        JSON.stringify(existing.exampleResponse || {}, null, 2)
      );
    } else {
      setExampleRequestText("{}");
      setExampleResponseText("{}");
    }
  }, [existing]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      setError("Kolom 'name' dan 'description' wajib diisi.");
      return;
    }

    try {
      const exampleRequestObj = JSON.parse(exampleRequestText || "{}");
      const exampleResponseObj = JSON.parse(exampleResponseText || "{}");

      const finalData = {
        ...formData,
        exampleRequest: exampleRequestObj,
        exampleResponse: exampleResponseObj,
      };

      setError("");
      onSave(finalData);
      onClose();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Format JSON tidak valid pada exampleRequest atau exampleResponse.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-h-[90vh] overflow-y-auto w-full max-w-3xl p-6 rounded shadow"
      >
        <h2 className="text-lg font-semibold mb-4">
          {existing ? "Edit Action" : "Tambah Action"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
        )}

        {/* Input name, method, domain, endpoint */}
        {["name", "method", "domain", "endpoint"].map((field) => (
          <label key={field} className="block mb-3">
            <p className="text-sm capitalize">
              {field}:{field === "name" ? <span className="text-red-500"> *</span> : null}
            </p>
            <input
              className="w-full p-2 border rounded"
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </label>
        ))}

        {/* Description */}
        <label className="block mb-3">
          <p className="text-sm capitalize">
            description:<span className="text-red-500"> *</span>
          </p>
          <textarea
            className="w-full p-2 border rounded resize-y min-h-[160px]"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </label>

        {/* Arrays */}
        {["keyword", "requestParameters", "responseParameters"].map((field) => (
          <div key={field} className="mb-3">
            <p className="text-sm capitalize mb-1">{field}:</p>
            {formData[field].map((val, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <input
                  className="w-full p-2 border rounded font-mono"
                  value={val}
                  onChange={(e) => handleArrayChange(field, i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(field, i)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(field)}
              className="text-xs text-blue-600 hover:underline mt-1"
            >
              + Add {field}
            </button>
          </div>
        ))}

        {/* JSON Textareas */}
        <label className="block mb-3">
          <p className="text-sm mb-1">exampleRequest (JSON):</p>
          <textarea
            className="w-full p-2 border font-mono rounded min-h-[160px]"
            value={exampleRequestText}
            onChange={(e) => setExampleRequestText(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <p className="text-sm mb-1">exampleResponse (JSON):</p>
          <textarea
            className="w-full p-2 border font-mono rounded min-h-[160px]"
            value={exampleResponseText}
            onChange={(e) => setExampleResponseText(e.target.value)}
          />
        </label>

        {/* Action buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActionFormModal;
