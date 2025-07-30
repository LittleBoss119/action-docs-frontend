import JsonBlock from "../shared/JsonBlock";

const ActionDetail = ({ action, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => onEdit(action)}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => {
            if (confirm("Yakin ingin menghapus action ini?")) onDelete(action.id);
          }}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑 Delete
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {action.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p className="text-gray-500 font-medium">Method:</p>
          <p className="text-gray-800">{action.method || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Domain:</p>
          <p className="text-gray-800">{action.domain || "-"}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-500 font-medium">Endpoint:</p>
        <p className="text-gray-800 font-mono break-all bg-gray-100 px-3 py-1 rounded">
          {action.endpoint || "-"}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-500 font-medium">Deskripsi:</p>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {action.description || "-"}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-2">Keyword:</p>
        <div className="flex flex-wrap gap-2">
          {action.keyword?.map((k, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {(action.requestParameters?.length || action.responseParameters?.length) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {action.requestParameters?.length > 0 && (
            <div>
              <p className="text-gray-600 font-medium mb-1">Request Parameters:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {action.requestParameters.map((param, index) => (
                  <li key={index}>{typeof param === "string" ? param : JSON.stringify(param)}</li>
                ))}
              </ul>
            </div>
          )}
          {action.responseParameters?.length > 0 && (
            <div>
              <p className="text-gray-600 font-medium mb-1">Response Parameters:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {action.responseParameters.map((param, index) => (
                  <li key={index}>{JSON.stringify(param)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 font-medium mb-1">Example Request:</p>
          <JsonBlock json={action.exampleRequest} />
        </div>
        <div>
          <p className="text-gray-600 font-medium mb-1">Example Response:</p>
          <JsonBlock json={action.exampleResponse} />
        </div>
      </div>
    </div>
  );
};

export default ActionDetail;
