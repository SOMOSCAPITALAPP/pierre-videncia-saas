import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "dark";
};

export function ButtonLink({ href, children, variant = "gold" }: ButtonLinkProps) {
  const classes =
    variant === "gold"
      ? "bg-[#d9aa4f] text-[#160b12] shadow-lg shadow-[#d9aa4f]/20"
      : "border border-[#d9aa4f]/40 bg-[#120817] text-[#fff7df]";

  return (
    <Link
      href={href}
      className={`font-ui inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-center font-bold ${classes}`}
    >
      {children}
    </Link>
  );
}
