import Image from 'next/image';
import pensil from '@/assets/pendaftaran/pensil.svg';

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
      <div className="relative">
        <input id={name} name={name} value={value} onChange={onChange} className="bg-[#E8EEFF] text-[#002787] px-4 py-2 pr-10 rounded-xl w-full" />
        <Image src={pensil} alt="Edit icon" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
}
