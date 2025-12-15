import type { ReactNode } from "react";
import { Container } from "../general/Container";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, description, children }: Props) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container className="space-y-10">
        <header className="space-y-4">
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {eyebrow}
            </p>
          ) : null}
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-3xl text-lg text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </Container>
    </section>
  );
}

