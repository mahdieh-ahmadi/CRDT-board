import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  const classes = ["mx-auto w-full max-w-6xl px-6", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

