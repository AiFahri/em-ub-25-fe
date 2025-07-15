type FieldCheckboxGroupProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string[];
  onChange: (name: string, value: string[]) => void;
};

export default function FieldCheckboxGroup({ label, name, options, value, onChange }: FieldCheckboxGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[#002787] font-medium">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, idx) => {
          const isChecked = value.includes(opt.value);
          return (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={opt.value}
                checked={isChecked}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const newValue = checked ? [...value, opt.value] : value.filter((v) => v !== opt.value);

                  onChange(name, newValue);
                }}
                className="accent-[#7CA1FF] w-4 h-4 rounded focus:ring-[#7CA1FF] border-[#7CA1FF]"
              />
              <span className="text-[#002787]">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
