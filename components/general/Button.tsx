import Link from "next/link";
import type { ComponentPropsWithRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  className?: string;
};

type ButtonProps = CommonProps &
  ComponentPropsWithRef<"button"> & { href?: undefined };

type AnchorProps = CommonProps &
  ComponentPropsWithRef<"a"> & { href: string };

export function Button(props: ButtonProps | AnchorProps) {
  const { children, variant = "primary", size = "md", className, ...rest } =
    props;

  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:cursor-notAllowed";
  const variants: Record<typeof variant, string> = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-100",
    secondary:
      "border border-zinc-200 text-zinc-800 hover:bg-zinc-100 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-100",
  };
  const sizes: Record<typeof size, string> = {
    md: "px-5 py-2 text-sm",
    sm: "px-4 py-1.5 text-xs",
  };
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...restAnchor } = rest as AnchorProps;
    return (
      <Link href={href} className={classes} {...restAnchor}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}

