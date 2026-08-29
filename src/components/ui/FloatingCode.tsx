const GLYPHS: { text: string; style: React.CSSProperties }[] = [
  { text: "</>", style: { top: "12%", left: "8%", animationDuration: "7s" } },
  { text: "{ }", style: { top: "70%", left: "12%", animationDuration: "9s", animationDelay: "1s" } },
  { text: "=>", style: { top: "22%", right: "10%", animationDuration: "8s", animationDelay: "0.5s" } },
  { text: "const", style: { top: "60%", right: "6%", animationDuration: "10s", animationDelay: "2s" } },
  { text: "npm i", style: { top: "85%", left: "45%", animationDuration: "6s", animationDelay: "1.5s" } },
];

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {GLYPHS.map((glyph) => (
        <span
          key={glyph.text}
          className="animate-float absolute select-none font-mono text-xs text-text-faint/30 md:text-sm"
          style={glyph.style}
        >
          {glyph.text}
        </span>
      ))}
    </div>
  );
}
