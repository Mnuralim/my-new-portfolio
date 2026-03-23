interface ModalFooterProps {
  info?: React.ReactNode;
  children: React.ReactNode;
}

export default function ModalFooter({ info, children }: ModalFooterProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      {info && (
        <span className="text-[0.6rem] tracking-[1px] text-muted">{info}</span>
      )}
      <div className="flex ml-auto" style={{ gap: 0 }}>
        {children}
      </div>
    </div>
  );
}
