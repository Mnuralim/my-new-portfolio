type ModalButtonVariant = "default" | "primary" | "danger";

interface ModalButtonProps {
  onClick?: () => void;
  variant?: ModalButtonVariant;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const variantClass: Record<ModalButtonVariant, string> = {
  default:
    "bg-transparent text-[#6b6b66] dark:text-[#999999] border-[#d8d8d2] dark:border-[#2a2a2a] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]",
  primary:
    "bg-accent text-black border-accent hover:bg-transparent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]",
  danger:
    "bg-accent2 text-black border-accent2 hover:bg-transparent hover:text-accent2",
};

export default function ModalButton({
  onClick,
  variant = "default",
  children,
  type = "button",
}: ModalButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        font-mono text-meta-xs tracking-widest
        px-5 py-2.5 border-2 -ml-px
        cursor-pointer transition-all duration-200
        ${variantClass[variant]}
      `}
    >
      {children}
    </button>
  );
}
