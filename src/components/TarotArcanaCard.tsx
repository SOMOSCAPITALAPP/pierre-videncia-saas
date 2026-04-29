import { getTarotVisual } from "@/lib/tarotVisuals";

type TarotArcanaCardProps = {
  nome: string;
  position?: string;
  compact?: boolean;
};

export function TarotArcanaCard({ nome, position, compact = false }: TarotArcanaCardProps) {
  const visual = getTarotVisual(nome);

  return (
    <div className={`marseille-card ${compact ? "marseille-card-compact" : ""}`}>
      <div className="marseille-card-frame">
        <div className="marseille-card-top">
          <span>{visual.roman}</span>
          <span>⚜</span>
        </div>
        <div className="marseille-card-scene">
          <div className="marseille-card-sun" />
          <div className="marseille-card-figure">
            <span>{visual.symbol}</span>
          </div>
          <div className="marseille-card-columns">
            <span />
            <span />
          </div>
          <div className="marseille-card-ground" />
        </div>
        <p className="marseille-card-title">{visual.marseilleTitle}</p>
      </div>
      <div className="mt-2 text-center">
        {position ? <p className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#d9aa4f]">{position}</p> : null}
        <h3 className="text-sm font-semibold leading-tight text-[#fff7df]">{nome}</h3>
        {!compact ? <p className="font-ui mt-1 text-[11px] leading-4 text-[#fff7df]/58">{visual.detail}</p> : null}
      </div>
    </div>
  );
}
