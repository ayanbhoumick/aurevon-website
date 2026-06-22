type Props = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-2">
          <span className="text-muted text-xs uppercase tracking-widest">
            Aurevon
          </span>
          <h1
            className="text-text font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted text-sm mt-1 max-w-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
