const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        token("bg"),
        base:      token("base"),
        surface:   token("surface"),
        surface2:  token("surface-2"),
        border:    token("border"),
        primary:   token("primary"),
        secondary: token("secondary"),
        faint:     token("faint"),
        accent:    token("accent"),
        accentDim: token("accent-dim"),
        accentFg:  token("accent-fg"),
      },
      fontFamily: {
        display: ["var(--font-sans)"],
        body:    ["var(--font-sans)"],
        mono:    ["var(--font-mono)"],
      },
      fontSize: {
        hero:    ["clamp(2.75rem,17vw,13rem)",  { lineHeight: "0.88", letterSpacing: "-0.05em" }],
        display: ["clamp(2.25rem,6vw,5rem)",    { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        title:   ["clamp(1.5rem,2.6vw,2.25rem)", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        lead:    ["clamp(1.125rem,1.4vw,1.375rem)", { lineHeight: "1.65" }],
      },
      spacing: {
        section: "var(--space-section)",
        gutter:  "var(--space-gutter)",
      },
      boxShadow: {
        hard:      "6px 6px 0 rgb(var(--color-accent))",
        "hard-sm": "4px 4px 0 rgb(var(--color-accent))",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
      },
    },
  },
  plugins: [],
}
