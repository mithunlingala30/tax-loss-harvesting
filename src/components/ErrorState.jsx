export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border border-coral-100 bg-coral-50 px-6 py-14 text-center">
      <p className="font-display text-sm font-semibold text-coral-600">Couldn't load your portfolio</p>
      <p className="max-w-sm text-xs text-coral-600/70">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-full bg-coral-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-coral-600"
      >
        Try again
      </button>
    </div>
  );
}
