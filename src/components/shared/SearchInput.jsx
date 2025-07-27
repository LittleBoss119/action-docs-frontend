const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Cari action atau domain..."
    className="w-full p-2 border border-gray-300 rounded mb-4"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchInput;
