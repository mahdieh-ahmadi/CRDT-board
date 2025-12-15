type Props = {
  title: string;
  description: string;
  icon?: string;
};

export function FeatureCard({ title, description, icon }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950/70 dark:hover:border-zinc-700">
      <div className="flex items-center gap-3 text-sm font-semibold text-zinc-900 dark:text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {icon ?? "•"}
        </span>
        <span>{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {description}
      </p>
    </div>
  );
}

