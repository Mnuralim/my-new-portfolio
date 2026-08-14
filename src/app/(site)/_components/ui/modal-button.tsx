type ModalButtonVariant = "default" | "primary" | "danger";

interface ModalButtonProps {
  onClick?: () => void;
  variant?: ModalButtonVariant;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const variantClass: Record<ModalButtonVariant, string> = {
  default: "bg-transparent hover:opacity-70",
  primary: "bg-accent text-[#0b0b0c] border-accent hover:opacity-90",
  danger: "bg-accent2 text-white border-accent2 hover:opacity-90",
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
      className={`font-mono text-meta-xs tracking-widest px-5 py-2.5 rounded-[8px] cursor-pointer transition-all duration-200 ${variantClass[variant]}`}
      style={
        variant === "default"
          ? { color: "var(--c-muted2)", border: "1px solid var(--c-border)" }
          : undefined
      }
    >
      {children}
    </button>
  );
}
