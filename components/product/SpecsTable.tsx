import type { ProductSpec } from "@/data/products";

type Props = {
  specs: ProductSpec;
};

export default function SpecsTable({ specs }: Props) {
  const entries = Object.entries(specs);

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="px-5 py-3 bg-raised border-b border-border">
        <h3 className="text-text text-xs uppercase tracking-widest font-medium">
          Specifications
        </h3>
      </div>
      <dl className="divide-y divide-border">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-4 px-5 py-3">
            <dt className="text-muted text-xs w-40 shrink-0 pt-0.5">{key}</dt>
            <dd className="text-text text-xs leading-relaxed">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
