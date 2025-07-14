import Image from 'next/image';
import dropdownform from '@/assets/pendaftaran/dropdownform.svg';

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
      <div className="relative">
        <select id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none bg-[#E8EEFF] text-[#002787] px-4 py-2 pr-10 rounded-xl w-full">
          <option value="" disabled hidden>
            Pilih {label}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <Image src={dropdownform} alt="Dropdown icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4" />
      </div>
    </div>
  );
}
