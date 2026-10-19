import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function Section({ title, eyebrow, children }: SectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10">
      {eyebrow ? <p className="font-ui mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">{eyebrow}</p> : null}
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <h2 className="text-3xl font-semibold leading-tight text-[#fff7df] md:text-4xl">{title}</h2>
        <span className="ornate-divider hidden min-w-36 text-sm md:flex">✦</span>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
