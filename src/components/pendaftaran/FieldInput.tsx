type FieldInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FieldInput({ label, name, value, onChange }: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[#002787] font-medium">
        {label}
      </label>
      <input id={name} name={name} value={value} onChange={onChange} className="bg-[#E8EEFF] text-[#002787] px-4 py-2 rounded-xl" />
    </div>
  );
}
