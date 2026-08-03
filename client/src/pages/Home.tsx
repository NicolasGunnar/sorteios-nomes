/**
 * Sorteios de Nomes — Main page
 * Soft Glass Minimal with strong frosted glass, visible reveal stage, rich palette
 */
import { useState, useCallback, useRef } from "react";
import { Shuffle, Zap, Users, Star, Sparkles, RotateCcw, Trophy, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassTabs } from "@/components/GlassTabs";
import { GlassToggle } from "@/components/GlassToggle";
import { NamesInput } from "@/components/NamesInput";
import { SlotMachine } from "@/components/SlotMachine";
import { Confetti } from "@/components/Confetti";
import { DrawHistory, DrawEntry } from "@/components/DrawHistory";
import { toast } from "sonner";

export default function Home() {
  const [activeTab, setActiveTab] = useState("simple");
  const [showConfetti, setShowConfetti] = useState(false);

  // ===== SIMPLE DRAW STATE =====
  const [names, setNames] = useState("");
  const [useAnimation, setUseAnimation] = useState(true);
  const [noRepeat, setNoRepeat] = useState(false);
  const [drawCount, setDrawCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [simpleHistory, setSimpleHistory] = useState<DrawEntry[]>([]);
  const [drawnNames, setDrawnNames] = useState<string[]>([]);
  const slotKeyRef = useRef(0);

  // ===== CROSS DRAW STATE =====
  const [table1Names, setTable1Names] = useState("");
  const [table2Names, setTable2Names] = useState("");
  const [crossNoRepeat, setCrossNoRepeat] = useState(false);
  const [crossWinner1, setCrossWinner1] = useState<string | null>(null);
  const [crossWinner2, setCrossWinner2] = useState<string | null>(null);
  const [crossIsDrawing, setCrossIsDrawing] = useState(false);
  const [crossHistory, setCrossHistory] = useState<DrawEntry[]>([]);
  const [drawnNamesT1, setDrawnNamesT1] = useState<string[]>([]);
  const [drawnNamesT2, setDrawnNamesT2] = useState<string[]>([]);

  // ===== HELPERS =====
  const getNamesList = (text: string): string[] =>
    text.split("\n").map((n) => n.trim()).filter((n) => n !== "");

  const triggerConfetti = () => {
    setShowConfetti(false);
    requestAnimationFrame(() => setShowConfetti(true));
    setTimeout(() => setShowConfetti(false), 1500);
  };

  // ===== SIMPLE DRAW =====
  const handleSimpleDraw = useCallback(() => {
    const nameList = getNamesList(names);
    if (nameList.length === 0) {
      toast.error("Adicione pelo menos um nome para sortear");
      return;
    }

    let available = noRepeat
      ? nameList.filter((n) => !drawnNames.includes(n))
      : [...nameList];

    const count = Math.min(drawCount, noRepeat ? available.length : nameList.length);

    if (available.length === 0) {
      toast.error("Todos os nomes já foram sorteados! Limpe o histórico ou ative a repetição.");
      return;
    }

    if (count > available.length) {
      toast.error(`Não há nomes suficientes. Disponível: ${available.length}, solicitado: ${count}`);
      return;
    }

    setIsDrawing(true);
    setWinners([]);
    slotKeyRef.current += 1;

    if (!useAnimation) {
      // Pick multiple winners without animation
      const picked: string[] = [];
      const pool = noRepeat ? [...available] : nameList;
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        const w = pool.splice(idx, 1)[0];
        picked.push(w);
      }
      setTimeout(() => {
        setWinners(picked);
        setIsDrawing(false);
        if (noRepeat) {
          setDrawnNames((prev) => [...prev, ...picked]);
        }
        setSimpleHistory((prev) => [
          ...picked.map((w, i) => ({
            id: Date.now() + i,
            result: w,
            timestamp: new Date(),
            type: "simple" as const,
            extra: count > 1 ? `Sorteio ${i + 1}/${count}` : undefined,
          })),
          ...prev,
        ]);
        triggerConfetti();
      }, 200);
    }
  }, [names, noRepeat, drawnNames, useAnimation, drawCount]);

  const handleSlotComplete = useCallback(
    (w: string) => {
      if (!w) return;
      setWinners((prev) => {
        const next = [...prev, w];
        setIsDrawing(false);
        if (noRepeat) {
          setDrawnNames((prev2) => [...prev2, w]);
        }
        setSimpleHistory((prev2) => [
          {
            id: Date.now(),
            result: w,
            timestamp: new Date(),
            type: "simple",
            extra: drawCount > 1 ? `Sorteio ${next.length}/${drawCount}` : undefined,
          },
          ...prev2,
        ]);
        triggerConfetti();
        return next;
      });
    },
    [noRepeat, drawCount]
  );

  const clearSimpleDrawn = () => {
    setDrawnNames([]);
    setSimpleHistory([]);
    setWinners([]);
  };

  // ===== CROSS DRAW =====
  const handleCrossDraw = useCallback(() => {
    const list1 = getNamesList(table1Names);
    const list2 = getNamesList(table2Names);

    if (list1.length === 0) {
      toast.error("Adicione pelo menos um nome na Tabela 1");
      return;
    }
    if (list2.length === 0) {
      toast.error("Adicione pelo menos um nome na Tabela 2");
      return;
    }

    // When no-repeat: filter out names already drawn from either table
    const availableList1 = crossNoRepeat
      ? list1.filter((n) => !drawnNamesT1.includes(n))
      : list1;
    const availableList2 = crossNoRepeat
      ? list2.filter((n) => !drawnNamesT2.includes(n))
      : list2;

    if (availableList1.length === 0 || availableList2.length === 0) {
      toast.error("Todos os nomes de uma das tabelas já foram sorteados! Limpe o histórico ou ative a repetição.");
      return;
    }

    setCrossIsDrawing(true);
    setCrossWinner1(null);
    setCrossWinner2(null);

    setTimeout(() => {
      const pick1 = availableList1[Math.floor(Math.random() * availableList1.length)];
      const pick2 = availableList2[Math.floor(Math.random() * availableList2.length)];
      setCrossWinner1(pick1);
      setCrossWinner2(pick2);
      setCrossIsDrawing(false);
      setDrawnNamesT1((prev) => [...prev, pick1]);
      setDrawnNamesT2((prev) => [...prev, pick2]);
      setCrossHistory((prev) => [
        {
          id: Date.now(),
          result: `${pick1} + ${pick2}`,
          timestamp: new Date(),
          type: "cross",
        },
        ...prev,
      ]);
      triggerConfetti();
    }, useAnimation ? 3000 : 200);
  }, [table1Names, table2Names, crossNoRepeat, drawnNamesT1, drawnNamesT2, useAnimation]);

  const clearCrossDrawn = () => {
    setDrawnNamesT1([]);
    setDrawnNamesT2([]);
    setCrossHistory([]);
    setCrossWinner1(null);
    setCrossWinner2(null);
  };

  const nameCount = getNamesList(names).length;
  const t1Count = getNamesList(table1Names).length;
  const t2Count = getNamesList(table2Names).length;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/manus-storage/bg-abstract_dafd6ecb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-background/40 to-background/70" />

      {showConfetti && <Confetti />}

      {/* Header */}
      <header className="pt-6 pb-2 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <img
            src="/manus-storage/logo-icon_9613a521.png"
            alt="Logo"
            className="w-12 h-12 drop-shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Sorteios de Nomes
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto font-medium">
          Sorteie nomes com facilidade — animação de suspense ou resultado instantâneo
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12 space-y-5">
        {/* Tab Navigation */}
        <GlassTabs
          tabs={[
            {
              id: "simple",
              label: "Sorteio Simples",
              icon: <Shuffle className="w-4 h-4" />,
            },
            {
              id: "cross",
              label: "Sorteio Cruzado",
              icon: <Users className="w-4 h-4" />,
            },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* ===== SIMPLE DRAW MODE ===== */}
        {activeTab === "simple" && (
          <div className="space-y-4" style={{ animation: "fadeSlideIn 0.3s var(--ease-out) both" }}>
            {/* Reveal Stage - always visible */}
            <div className="reveal-stage rounded-3xl px-8 py-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  {isDrawing ? (drawCount > 1 ? `Sorteando ${drawCount} nomes...` : "Sorteando...") : winners.length > 0 ? "Resultado" : "Área do Sorteio"}
                </p>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>

              {isDrawing && useAnimation ? (
                <SlotMachine
                  key={slotKeyRef.current}
                  names={
                    noRepeat
                      ? getNamesList(names).filter((n) => !drawnNames.includes(n))
                      : getNamesList(names)
                  }
                  duration={3000}
                  onComplete={handleSlotComplete}
                  onRunning={setIsDrawing}
                />
              ) : winners.length > 0 ? (
                <div className="animate-in fade-in zoom-in-95 duration-300 space-y-3">
                  {winners.map((w, i) => (
                    <div key={i} className="relative inline-block mx-2">
                      <div className="absolute -inset-2 bg-amber-400/15 rounded-full blur-lg" />
                      <p className="relative text-3xl md:text-4xl font-extrabold tracking-tight text-amber-600">
                        {drawCount > 1 && (
                          <span className="text-sm font-bold text-muted-foreground mr-2">{i + 1}.</span>
                        )}
                        {w}
                      </p>
                    </div>
                  ))}
                  {winners.length > 1 && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {winners.map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adicione nomes e clique em <span className="font-semibold text-amber-600">Sortear Agora</span>
                  </p>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassToggle
                  checked={useAnimation}
                  onCheckedChange={setUseAnimation}
                  label="Com animação"
                  description="Roda de nomes por 3 segundos"
                />
                <GlassToggle
                  checked={noRepeat}
                  onCheckedChange={setNoRepeat}
                  label="Sem repetição"
                  description="Cada nome sorteado apenas uma vez"
                />
              </div>

              {/* Multiple draw count */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-bold text-foreground">Quantos nomes sortear:</label>
                <input
                  type="number"
                  min={1}
                  max={noRepeat ? nameCount : 50}
                  value={drawCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1) {
                      setDrawCount(Math.min(val, noRepeat ? nameCount : 50));
                    }
                  }}
                  className="w-20 h-9 rounded-lg border border-border bg-white/50 px-3 text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300 transition-all"
                />
                <span className="text-xs text-muted-foreground">
                  {noRepeat && `(${Math.max(0, nameCount - drawnNames.length)} disponíveis)`}
                </span>
              </div>
            </div>

            {/* Names Input */}
            <NamesInput
              value={names}
              onChange={setNames}
              title="Nomes para sorteio"
              placeholder="Digite um nome por linha...&#10;Maria&#10;João&#10;Ana&#10;Pedro"
              count={nameCount}
            />

            {/* Draw Button */}
            <Button
              onClick={handleSimpleDraw}
              disabled={isDrawing}
              className="w-full h-14 text-lg font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50 transition-all duration-300 hover:scale-[0.98] active:scale-[0.96]"
              size="lg"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              {isDrawing ? "Sorteando..." : "Sortear Agora"}
            </Button>

            {/* Drawn count indicator */}
            {drawnNames.length > 0 && (
              <div className="glass-card-solid rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{drawnNames.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{nameCount}</span>{" "}
                  nomes já sorteados
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSimpleDrawn}
                  className="text-xs text-muted-foreground hover:text-destructive gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpar
                </Button>
              </div>
            )}

            {/* History */}
            <DrawHistory
              entries={simpleHistory}
              onClear={clearSimpleDrawn}
            />
          </div>
        )}

        {/* ===== CROSS DRAW MODE ===== */}
        {activeTab === "cross" && (
          <div className="space-y-4" style={{ animation: "fadeSlideIn 0.3s var(--ease-out) both" }}>
            {/* Cross Reveal Stage */}
            <div className="reveal-stage rounded-3xl px-6 py-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                  {crossIsDrawing ? "Sorteando par..." : "Resultado do Cruzado"}
                </p>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>

              {crossIsDrawing ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="flex-1 glass-card-solid rounded-xl px-4 py-6 animate-pulse">
                    <p className="text-xs text-muted-foreground mb-1">Tabela 1</p>
                    <p className="text-2xl font-extrabold text-muted-foreground/40">???</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                    <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
                    <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                  </div>
                  <div className="flex-1 glass-card-solid rounded-xl px-4 py-6 animate-pulse">
                    <p className="text-xs text-muted-foreground mb-1">Tabela 2</p>
                    <p className="text-2xl font-extrabold text-muted-foreground/40">???</p>
                  </div>
                </div>
              ) : (crossWinner1 && crossWinner2) ? (
                <div className="flex items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex-1 glass-card-solid rounded-xl px-4 py-5">
                    <p className="text-xs font-medium text-lavender mb-1">Tabela 1</p>
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-amber-400/15 rounded-full blur-md" />
                      <p className="relative text-2xl md:text-3xl font-extrabold text-amber-600">
                        {crossWinner1}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200/50 flex items-center justify-center">
                      <span className="text-lg font-bold text-amber-500">+</span>
                    </div>
                    <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                  </div>
                  <div className="flex-1 glass-card-solid rounded-xl px-4 py-5">
                    <p className="text-xs font-medium text-sky mb-1">Tabela 2</p>
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-amber-400/15 rounded-full blur-md" />
                      <p className="relative text-2xl md:text-3xl font-extrabold text-amber-600">
                        {crossWinner2}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-100 to-lavender-50 border border-sky-200/50 flex items-center justify-center">
                    <Users className="w-8 h-8 text-sky" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Preencha as duas tabelas e clique em{" "}
                    <span className="font-semibold text-amber-600">Sortear Par</span>
                  </p>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="glass-card rounded-2xl p-5">
              <GlassToggle
                checked={crossNoRepeat}
                onCheckedChange={setCrossNoRepeat}
                label="Sem repetir nomes"
                description="Nomes já sorteados ficam fora do próximo sorteio"
              />
            </div>

            {/* Two Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NamesInput
                value={table1Names}
                onChange={setTable1Names}
                title="Tabela 1"
                placeholder="Nomes do primeiro grupo..."
                count={t1Count}
              />
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-amber-400" />
              </div>
              <div className="md:hidden flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-amber-400 rotate-90" />
              </div>
              <NamesInput
                value={table2Names}
                onChange={setTable2Names}
                title="Tabela 2"
                placeholder="Nomes do segundo grupo..."
                count={t2Count}
              />
            </div>

            {/* Draw Button */}
            <Button
              onClick={handleCrossDraw}
              disabled={crossIsDrawing}
              className="w-full h-14 text-lg font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50 transition-all duration-300 hover:scale-[0.98] active:scale-[0.96]"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              {crossIsDrawing ? "Sorteando..." : "Sortear Par"}
            </Button>

            {/* Drawn names count */}
            {crossNoRepeat && (drawnNamesT1.length > 0 || drawnNamesT2.length > 0) && (
              <div className="glass-card-solid rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{drawnNamesT1.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{t1Count}</span> (T1) e{" "}
                  <span className="font-semibold text-foreground">{drawnNamesT2.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{t2Count}</span> (T2) já sorteados
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCrossDrawn}
                  className="text-xs text-muted-foreground hover:text-destructive gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpar
                </Button>
              </div>
            )}

            {/* Cross History */}
            <DrawHistory
              entries={crossHistory}
              onClear={clearCrossDrawn}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs text-muted-foreground">
        Sorteios de Nomes — Simples, rápido e justo
      </footer>

      {/* Global animation styles */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
