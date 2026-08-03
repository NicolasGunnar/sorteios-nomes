/**
 * Soft Glass Minimal — Glass-style toggle switch with refined design
 */
import { cn } from "@/lib/utils";

interface GlassToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function GlassToggle({ checked, onCheckedChange, label, description }: GlassToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-out shrink-0",
          "border shadow-sm",
          checked
            ? "bg-amber-500 border-amber-400/50 shadow-amber-200/60"
            : "bg-gray-200 border-gray-300/50"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ease-out",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-foreground leading-tight">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground leading-tight">{description}</span>
        )}
      </div>
    </label>
  );
}
