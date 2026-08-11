import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: Props) {
  return (
    <div className={`page-shell ${className}`.trim()}>{children}</div>
  );
}
