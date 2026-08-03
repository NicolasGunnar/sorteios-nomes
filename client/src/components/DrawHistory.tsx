/**
 * Soft Glass Minimal — History of draws with rich palette
 */
import { cn } from "@/lib/utils";
import { History, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DrawEntry {
  id: number;
  result: string;
  timestamp: Date;
  type: "simple" | "cross";
  extra?: string;
}

interface DrawHistoryProps {
  entries: DrawEntry[];
  onClear: () => void;
}

export function DrawHistory({ entries, onClear }: DrawHistoryProps) {
  if (entries.length === 0) return null;

  return (
    <div className="glass-card-solid rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-bold text-foreground">Histórico</h3>
          <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            {entries.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive h-8 px-2 gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Limpar
        </Button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
              "bg-white/50 hover:bg-white/80",
              i === 0 && "ring-1 ring-amber-300/40 bg-amber-50/40"
            )}
          >
            {i === 0 ? (
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <span className="text-xs font-bold text-muted-foreground/50 w-5 text-center shrink-0">
                {i + 1}
              </span>
            )}
            <span className="font-semibold text-foreground flex-1">
              {entry.extra || entry.result}
            </span>
            <span className="text-xs text-muted-foreground/70">
              {entry.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
