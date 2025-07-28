const ActionList = ({ actions, onSelect, selectedId }) => {
  return (
    <div className="space-y-2 pr-2">
      {actions.map((action) => (
        <div
          key={action.id}
          onClick={() => onSelect(action)}
          className={`cursor-pointer border rounded p-3 bg-white hover:bg-gray-100 transition-colors duration-150 ${
            selectedId === action.id ? "border-blue-500 shadow-sm" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm flex-1 min-w-0 break-words">
              {action.name}
            </h3>
            <span className="text-xs bg-gray-200 rounded px-2 py-0.5 whitespace-nowrap">
              {action.method}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{action.domain}</p>
        </div>
      ))}
    </div>
  );
};

export default ActionList;
