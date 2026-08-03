# Ideias de Design — Sorteios de Nomes

## Três Abordagens

### 1. Festival Confete
**Intro:** Design vibrante e festivo com cores quentes e elementos de celebração. Evoca a sensação de um sorteio ao vivo, com confetes e surpresa.
**Probability:** 0.07

### 2. Neobrutalism Funcional
**Intro:** Estilo bold com bordas grossas, sombras duras e cores contrastantes. Transmite confiança e simplicidade funcional.
**Probability:** 0.04

### 3. Soft Glass Minimal
**Intro:** Design clean com efeitos de vidro fosco (glassmorphism), tons suaves de pêssego e azul-celeste, tipografia moderna e arredondada. Sensação de ferramenta premium e intuitiva.
**Probability:** 0.03

## Abordagem Escolhida: Soft Glass Minimal

### Design Movement
Neo-Minimalismo com Glassmorphism — uma ferramenta que parece um app nativo premium, com profundidade sutil e clareza absoluta.

### Core Principles
1. **Clareza acima de tudo** — Cada ação é óbvia, cada resultado é legível
2. **Profundidade sutil** — Glassmorphism e sombras suaves criam hierarquia sem poluição visual
3. **Cores funcionais** — Cada cor tem um propósito: ação, sucesso, alerta
4. **Feedback imediato** — Animações curtas confirmam ações, resultado de sorteio é dramático mas rápido

### Color Philosophy
- **Background:** Tons suaves de lavanda/cinza claro — não branco puro, não escuro. Confortável aos olhos.
- **Accent (Sorteio):** Âmbar/Dourado — evoca brilho, prêmio, celebração
- **Success:** Verde-esmeralda — confirmação de sucesso
- **Danger:** Rosa-coral — ações destrutivas (limpar listas)
- **Glass:** Branco translúcido com blur para cards e painéis

### Layout Paradigm
- Layout centralizado com card principal em glassmorphism
- Abas horizontais para alternar entre os 3 modos de sorteio
- Área de entrada de nomes com textarea expansível
- Resultado destacado com animação de revelação

### Signature Elements
1. **Slot-machine reveal** — Animação de roleta rápida para o resultado do sorteio
2. **Glass cards** — Painéis com backdrop-blur e bordas sutis
3. **Confetti burst** — Efeito de confete ao revelar resultado

### Interaction Philosophy
- Botões grandes e táteis com micro-feedback
- Transições suaves entre modos de sorteio
- Toggle switches para opções (repetir/não repetir, com/sem animação)
- Historial de sorteios visível e scrollável

### Animation
- Entrada: cards com fade-in + slide-up (200ms, ease-out)
- Sorteio com animação: roleta de nomes por 3s com desaceleração
- Revelação: scale-up com confete (300ms ease-out)
- Sorteios sem animação: resultado instantâneo com fade-in

### Typography System
- **Títulos:** "DM Sans" Bold 700 — moderna, geométrica, forte
- **Corpo:** "DM Sans" Regular 400 — legível e neutra
- **Resultados:** "DM Sans" ExtraBold 800 — impacto máximo
- Hierarquia: H1 2.5rem > H2 1.5rem > Body 1rem > Caption 0.875rem

### Brand Essence
Uma ferramenta de sorteio que é bonita o suficiente para usar em apresentações ao vivo, simples o suficiente para qualquer pessoa operar em segundos.
**Personalidade:** Confiável, Elegante, Acessível

### Brand Voice
- Headlines: diretas, sem floreio — "Sorteie nomes com facilidade"
- CTAs: verbos de ação claros — "Sortear agora", "Adicionar nomes"
- Microcopy: amigável — "Nenhum nome sorteado ainda", "Lista pronta!"
- Exemplo: "Adicione os nomes e clique em sortear" / "Resultado pronto!"

### Wordmark & Logo
Símbolo abstrato: um "slot" estilizado com uma estrela/brilho saindo dele, em âmbar/dourado. Simples, reconhecível, sem texto.

### Signature Brand Color
**Âmbar Gold:** oklch(0.75 0.15 80) — usado para CTAs principais, ícones de destaque, e o momento do reveal

## Style Decisions
- **Glass material rule:** Cards and panels should read as frosted glass over a soft lavender/peach/sky atmospheric background, with depth coming from translucency, blur, and layered light rather than flat white surfaces.
- **Brand mark rule:** The logo must be a custom abstract amber slot/star symbol, never an emoji-like or generic icon, and the same slot/star motif should recur subtly in reveal, empty-state, and highlight moments.
- **Sorteio stage rule:** The interface should always include a visible "reveal stage" for the draw result, even in the empty state, so the slot-machine/confetti promise is apparent before the user clicks "Sortear."
- **Palette rule:** Use soft peach, sky-blue, lavender, emerald, and coral as functional accents alongside amber primary.
