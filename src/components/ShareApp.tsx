"use client";

import { useState } from "react";
import { Check, Copy, Facebook, MessageCircle, Share2 } from "lucide-react";

const shareUrl = "https://pierre-videncia-saas.vercel.app";
const shareTitle = "Pierre Videncia — Tarot, Amor e Clareza Espiritual";
const shareText =
  "Conheça Pierre Videncia: uma leitura espiritual com Tarô de Marselha para amor, dinheiro, família, saúde emocional e decisões importantes.";

type ShareAppProps = {
  compact?: boolean;
};

export function ShareApp({ compact = false }: ShareAppProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);

  async function share() {
    if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      return;
    }

    await copy();
  }

  async function copy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className={`mystic-border rounded-[8px] ${compact ? "p-4" : "p-6"}`}>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">compartilhar</p>
          <h2 className={`${compact ? "mt-2 text-xl" : "mt-3 text-2xl"} font-semibold`}>Indique Pierre Videncia</h2>
          <p className="font-ui mt-2 leading-7 text-[#fff7df]/72">
            Compartilhe a aplicação com alguém que precisa de clareza, acolhimento e uma leitura espiritual cuidadosa antes de decidir.
          </p>
        </div>
        <div className="font-ui flex flex-wrap gap-2">
          <button
            type="button"
            onClick={share}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-4 text-sm font-bold text-[#160b12]"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-4 text-sm font-bold text-[#fff7df]"
          >
            <Facebook className="h-4 w-4 text-[#d9aa4f]" />
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodedText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-4 text-sm font-bold text-[#fff7df]"
          >
            <MessageCircle className="h-4 w-4 text-[#d9aa4f]" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-4 text-sm font-bold text-[#fff7df]"
          >
            {copied ? <Check className="h-4 w-4 text-[#d9aa4f]" /> : <Copy className="h-4 w-4 text-[#d9aa4f]" />}
            {copied ? "Copiado" : "Copiar link"}
          </button>
        </div>
      </div>
    </div>
  );
}
