// filter/tab pill shared by projects modal, CV modal and blog list
export default function Chip({
  active,
  onClick,
  children,
  role,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  role?: "tab";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role={role}
      aria-pressed={role ? undefined : active}
      aria-selected={role ? active : undefined}
      className="h-10 px-4 rounded-full text-[0.9rem] font-medium whitespace-nowrap cursor-pointer transition-colors"
      style={
        active
          ? { background: "var(--color-accent)", color: "var(--c-on-accent)", border: "1px solid var(--color-accent)" }
          : { background: "transparent", color: "var(--c-muted)", border: "1px solid var(--c-border)" }
      }
    >
      {children}
    </button>
  );
}
