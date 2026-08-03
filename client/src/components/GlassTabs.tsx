/**
 * Soft Glass Minimal — Tab navigation with strong glass effect
 */
import { cn } from "@/lib/utils";

interface GlassTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function GlassTabs({ tabs, activeTab, onTabChange }: GlassTabsProps) {
  return (
    <div className="glass-card rounded-2xl p-1.5 flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out",
            "hover:scale-[0.97] active:scale-[0.95]",
            activeTab === tab.id
              ? "bg-amber-500 text-white shadow-lg shadow-amber-200/60"
              : "text-muted-foreground hover:text-foreground hover:bg-white/40"
          )}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
