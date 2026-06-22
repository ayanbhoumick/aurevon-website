type Props = {
  price: number | null;
  stock: number;
};

export default function StockBadge({ price, stock }: Props) {
  if (price === null) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-gold border border-gold/30 px-2.5 py-1 rounded-sm">
        Coming Soon
      </span>
    );
  }

  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted border border-border px-2.5 py-1 rounded-sm">
        Sold Out
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#4ade80] border border-[#4ade80]/20 px-2.5 py-1 rounded-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
      In Stock
    </span>
  );
}
