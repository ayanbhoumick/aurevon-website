"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [visible, setVisible] = useState(true);
  const pending = useRef(children);

  useEffect(() => {
    pending.current = children;
    setVisible(false); // eslint-disable-line react-hooks/set-state-in-effect
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleTransitionEnd() {
    if (!visible) {
      setDisplayChildren(pending.current);
      setVisible(true);
    }
  }

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        transition: "opacity 0.22s ease, transform 0.22s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-5px)",
      }}
    >
      {displayChildren}
    </div>
  );
}
