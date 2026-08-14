interface ModalFooterProps {
  info?: React.ReactNode;
  children: React.ReactNode;
}

export default function ModalFooter({ info, children }: ModalFooterProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      {info && (
        <span
          className="text-meta-2xs tracking-[1px]"
          style={{ color: "var(--c-muted2)" }}
        >
          {info}
        </span>
      )}
      <div className="flex ml-auto gap-2">{children}</div>
    </div>
  );
}
