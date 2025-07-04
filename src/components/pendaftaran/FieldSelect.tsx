type FieldSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
};

export default function FieldSelect({ label, name, options, value, onChange }: FieldSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[#002787] font-medium">
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} className="bg-[#E8EEFF] text-[#002787] px-4 py-2 rounded-xl">
        <option value="">Pilih {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
