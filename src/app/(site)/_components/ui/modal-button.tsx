type ModalButtonVariant = "default" | "primary" | "danger";

interface ModalButtonProps {
  onClick?: () => void;
  variant?: ModalButtonVariant;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const variantClass: Record<ModalButtonVariant, string> = {
  default:
    "bg-transparent text-muted border-border hover:border-accent hover:text-accent",
  primary:
    "bg-accent text-black border-accent hover:bg-transparent hover:text-accent",
  danger:
    "bg-accent2 text-white border-accent2 hover:bg-transparent hover:text-accent2",
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
        font-mono text-[0.62rem] tracking-widest
        px-5 py-2.5 border-2 -ml-px
        cursor-pointer transition-all duration-200
        ${variantClass[variant]}
      `}
    >
      {children}
    </button>
  );
}
