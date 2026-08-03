/**
 * Soft Glass Minimal — Textarea for entering names with refined glass styling
 */
import { cn } from "@/lib/utils";

interface NamesInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  count?: number;
}

export function NamesInput({ value, onChange, placeholder, title, count }: NamesInputProps) {
  const names = value.split("\n").filter((n) => n.trim() !== "");

  return (
    <div className="glass-card-solid rounded-2xl p-5">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50">
            {count !== undefined ? count : names.length} nomes
          </span>
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Digite um nome por linha..."}
        rows={8}
        className={cn(
          "w-full rounded-xl border border-border bg-white/50",
          "px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300",
          "transition-all duration-200 resize-y font-medium"
        )}
      />
    </div>
  );
}
