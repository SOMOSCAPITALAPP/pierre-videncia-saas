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
      <h2 className="text-3xl font-semibold text-[#fff7df]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
