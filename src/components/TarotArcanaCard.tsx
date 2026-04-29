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
      <img className="marseille-card-photo" src={visual.image} alt={`${visual.marseilleTitle} - ${nome}`} loading="lazy" />
      <div className="mt-2 text-center">
        {position ? <p className="font-ui text-[10px] uppercase tracking-[0.14em] text-[#d9aa4f]">{position}</p> : null}
        <h3 className="text-sm font-semibold leading-tight text-[#fff7df]">{nome}</h3>
        {!compact ? <p className="font-ui mt-1 text-[11px] leading-4 text-[#fff7df]/58">{visual.detail}</p> : null}
      </div>
    </div>
  );
}
