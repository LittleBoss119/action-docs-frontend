const ActionList = ({ actions, onSelect, selectedId }) => {
  return (
    <div className="space-y-2 pr-2">
      {actions.map((action) => (
        <div
          key={action.id}
          onClick={() => onSelect(action)}
          className={`cursor-pointer border rounded p-3 bg-white hover:bg-gray-100 ${
            selectedId === action.id ? "border-blue-500" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{action.name}</h3>
            <span className="text-xs bg-gray-200 rounded px-2 py-0.5">
              {action.method}
            </span>
          </div>
          <p className="text-xs text-gray-500">{action.domain}</p>
        </div>
      ))}
    </div>
  );
};

export default ActionList;
