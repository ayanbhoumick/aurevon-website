import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs: Crumb[];
};

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? "text-text" : ""}>{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
