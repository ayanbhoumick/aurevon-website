type Props = {
  price: number | null;
  stock: number;
};

export default function AddToCartButton({ price, stock }: Props) {
  if (price === null) {
    return (
      <div className="flex flex-col gap-2">
        <button
          disabled
          className="w-full py-4 bg-surface border border-gold/20 text-gold text-sm tracking-widest uppercase cursor-not-allowed opacity-60"
        >
          Coming Soon
        </button>
        <p className="text-muted text-xs text-center">
          Price will be announced soon. Contact us for enquiries.
        </p>
      </div>
    );
  }

  if (stock === 0) {
    return (
      <button
        disabled
        className="w-full py-4 bg-surface border border-border text-muted text-sm tracking-widest uppercase cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  return (
    <button
      disabled
      className="w-full py-4 bg-gold text-bg text-sm font-medium tracking-widest uppercase hover:bg-gold-muted transition-colors duration-200 cursor-not-allowed opacity-60"
      title="Purchase coming soon"
    >
      Add to Cart
    </button>
  );
}
