import { ChevronDown } from "lucide-react";

const Dropdown = ({ label, options, value, onChange, error }) => {
  return (
    <div>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0B4C77] appearance-none"
        >
          <option value="">Choose user</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2"
          size={20}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Dropdown;
