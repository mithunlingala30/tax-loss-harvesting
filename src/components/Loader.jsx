export default function Loader() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-28 rounded-xl2 bg-ink-900/8" />
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-40 flex-1 rounded-xl2 bg-ink-900/6" />
        <div className="h-40 flex-1 rounded-xl2 bg-ink-900/6" />
      </div>
      <div className="h-10 w-40 rounded-full bg-ink-900/6" />
      <div className="h-72 rounded-xl2 bg-ink-900/6" />
    </div>
  );
}
