import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DropdownRadio({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || label;

  return (
    <div className="relative w-64 text-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-full px-4 py-2 text-left bg-white border border-gray-300 flex items-center justify-between"
      >
        <span className={selected ? 'text-black' : 'text-gray-400'}>
          {selectedLabel}
        </span>
        <ChevronDown className="h-4 w-4 text-black" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md border border-gray-300 shadow-lg">
          <ul className="py-2">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <input
                  type="radio"
                  name="dropdown-radio"
                  checked={selected === opt.value}
                  readOnly
                />
                <label>{opt.label}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
