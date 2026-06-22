import "./StarBorder.css";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color" | "children">;

export default function StarBorder<T extends ElementType = "div">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: Props<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...(rest as { style?: React.CSSProperties }).style }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div
        className="border-gradient-top"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
}
