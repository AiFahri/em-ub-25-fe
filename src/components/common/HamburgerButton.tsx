type HamburgerButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  return (
    <div className="w-8 h-8 flex flex-col justify-center items-center cursor-pointer z-[60] relative" onClick={onToggle}>
      <div
        className={`absolute w-[28px] h-0.5 bg-black rounded-lg transition-all duration-500 ease-in-out origin-center
      ${isOpen ? 'rotate-[135deg]  translate-x-[1px] scale-100' : '-translate-y-2'}`}
      />
      <div
        className={`absolute w-[28px] h-0.5 bg-black rounded-lg transition-all duration-500 ease-in-out origin-center
      ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}
      />
      <div
        className={`absolute w-[28px] h-0.5 bg-black rounded-lg transition-all duration-500 ease-in-out origin-center
      ${isOpen ? '-rotate-[135deg] -translate-x-[1px] scale-100' : 'translate-y-2'}`}
      />
    </div>
  );
}
