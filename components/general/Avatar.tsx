type Props = {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

export function Avatar({ name, src, size = "md", className }: Props) {
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";

  const classes = [
    "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-zinc-200 to-zinc-100 text-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800/70",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-label={name ?? "User avatar"}>
      {src ? (
        <img
          src={src}
          alt={name ?? "User avatar"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="font-semibold">{initials}</span>
      )}
    </div>
  );
}

