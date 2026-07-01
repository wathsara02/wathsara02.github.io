/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg:          "#09090B",
        base:        "#0D0D0F",
        surface:     "#18181B",
        surface2:    "#27272A",
        border:      "#3F3F46",
        borderHover: "#DFE104",
        primary:     "#FAFAFA",
        secondary:   "#A1A1AA",
        faint:       "#52525B",
        accent:      "#DFE104",
        accentDim:   "#C8CA03",
        accentFg:    "#000000",
        accentGlow:  "rgba(223,225,4,0.18)",
        accentSoft:  "rgba(223,225,4,0.07)",
        green:       "#DFE104",
        greenSoft:   "rgba(223,225,4,0.07)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        serif:   ['"Space Grotesk"', "sans-serif"],
        body:    ['"Space Grotesk"', "sans-serif"],
        ui:      ['"Space Grotesk"', "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "hero":   ["clamp(3.8rem,12vw,10rem)",  { lineHeight: "0.90", letterSpacing: "-0.05em" }],
        "display":["clamp(2.4rem,6vw,5.5rem)",  { lineHeight: "1.0",  letterSpacing: "-0.04em" }],
        "title":  ["clamp(1.6rem,3vw,2.6rem)",  { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "xl2":    ["1.375rem", { lineHeight: "1.6" }],
        "lg2":    ["1.2rem",   { lineHeight: "1.7" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "acid-line": "linear-gradient(90deg, transparent, #DFE104, transparent)",
      },
      animation: {
        "float":     "float 7s ease-in-out infinite",
        "float-r":   "float 9s ease-in-out infinite reverse",
        "spin-slow": "spin 20s linear infinite",
        "marquee":   "marquee 35s linear infinite",
      },
      keyframes: {
        float:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      boxShadow: {
        "acid-sm": "0 0 0 1px #DFE104, 0 0 20px rgba(223,225,4,0.15)",
        "acid-md": "0 0 0 2px #DFE104, 0 0 40px rgba(223,225,4,0.20)",
        "acid-lg": "0 0 0 2px #DFE104, 0 0 80px rgba(223,225,4,0.25)",
        "card":    "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
}
