export default function Loading() {
  return (
    <div className="px-4 sm:px-8 py-20 max-w-7xl mx-auto animate-pulse" aria-busy="true" aria-label="Memuat">
      <div
        className="h-4 w-40 rounded-full mb-8"
        style={{ background: "var(--c-cardbg)" }}
      />
      <div
        className="h-12 w-2/3 rounded-[10px] mb-4"
        style={{ background: "var(--c-cardbg)" }}
      />
      <div
        className="h-12 w-1/2 rounded-[10px] mb-10"
        style={{ background: "var(--c-cardbg)" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-[14px]"
            style={{ background: "var(--c-cardbg)", border: "1px solid var(--c-cardborder)" }}
          />
        ))}
      </div>
    </div>
  );
}
