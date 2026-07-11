function initials(symbol) {
  return symbol.slice(0, 1).toUpperCase();
}

export default function CoinBadge({ symbol, color, size = 36 }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: color,
        boxShadow: `0 4px 10px -2px ${color}66`,
      }}
      aria-hidden="true"
    >
      {initials(symbol)}
    </div>
  );
}
