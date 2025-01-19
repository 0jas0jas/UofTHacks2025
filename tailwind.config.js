import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          colors: {
            default: {
              "50": "#f6f5f4",
              "100": "#e9e7e5",
              "200": "#dbd9d6",
              "300": "#cecbc6",
              "400": "#c1bdb7",
              "500": "#b4afa8",
              "600": "#95908b",
              "700": "#75726d",
              "800": "#565350",
              "900": "#363532",
              "foreground": "#000",
              "DEFAULT": "#b4afa8"
            },
            primary: {
              "50": "#fbf1e9",
              "100": "#f4dec9",
              "200": "#eecbaa",
              "300": "#e8b88a",
              "400": "#e1a56b",
              "500": "#db924b",
              "600": "#b5783e",
              "700": "#8e5f31",
              "800": "#684524",
              "900": "#422c17",
              "foreground": "#000",
              "DEFAULT": "#db924b"
            },
            secondary: {
              "50": "#eaf0f0",
              "100": "#cedadb",
              "200": "#b1c5c6",
              "300": "#94afb0",
              "400": "#779a9b",
              "500": "#5a8486",
              "600": "#4a6d6f",
              "700": "#3b5657",
              "800": "#2b3f40",
              "900": "#1b2828",
              "foreground": "#000",
              "DEFAULT": "#5a8486"
            },
            success: {
              "50": "#f3f6f0",
              "100": "#e2e9db",
              "200": "#d0ddc6",
              "300": "#bfd0b1",
              "400": "#aec49c",
              "500": "#9db787",
              "600": "#82976f",
              "700": "#667758",
              "800": "#4b5740",
              "900": "#2f3729",
              "foreground": "#000",
              "DEFAULT": "#9db787"
            },
            warning: {
              "50": "#fff9eb",
              "100": "#fff2cf",
              "200": "#ffeab3",
              "300": "#ffe297",
              "400": "#ffda7b",
              "500": "#ffd25f",
              "600": "#d2ad4e",
              "700": "#a6893e",
              "800": "#79642d",
              "900": "#4d3f1d",
              "foreground": "#000",
              "DEFAULT": "#ffd25f"
            },
            danger: {
              "50": "#fff2ef",
              "100": "#fedfd9",
              "200": "#fecdc3",
              "300": "#fdbaad",
              "400": "#fda897",
              "500": "#fc9581",
              "600": "#d07b6a",
              "700": "#a46154",
              "800": "#78473d",
              "900": "#4c2d27",
              "foreground": "#000",
              "DEFAULT": "#fc9581"
            },
            background: "#fffbf6",
            foreground: {
              "50": "#f3ede4",
              "100": "#e3d5be",
              "200": "#d3bc97",
              "300": "#c3a371",
              "400": "#b28b4b",
              "500": "#a27225",
              "600": "#865e1f",
              "700": "#694a18",
              "800": "#4d3612",
              "900": "#31220b",
              "foreground": "#000",
              "DEFAULT": "#a27225"
            },
            content1: {
              "DEFAULT": "#fff2e0",
              "foreground": "#000"
            },
            content2: {
              "DEFAULT": "#ffe9cc",
              "foreground": "#000"
            },
            content3: {
              "DEFAULT": "#ffe0b8",
              "foreground": "#000"
            },
            content4: {
              "DEFAULT": "#ffd7a3",
              "foreground": "#000"
            },
            focus: "#db924b",
            overlay: "#000000",
            divider: "#111111"
          }
        },
        dark: {
          "colors": {
            "background": {
              "DEFAULT": "#0F0F0F",
              "foreground": "#fafafa"
            },
            "content1": "#141414",
            "content2": "#212121",
            "content3": "#2e2e2e",
            "content4": "#404040",
            "danger": {
              "50": "#22272b",
              "100": "#48535b",
              "200": "#697986",
              "300": "#98a4ae",
              "400": "#c0c8ce",
              "500": "#ccd2d7",
              "600": "#d7dce0",
              "700": "#e5e8eb",
              "800": "#f4f5f6",
              "900": "#f9fafb",
              "DEFAULT": "#ABB7C2"
            },
            "default": {
              "50": "#004c3c",
              "100": "#01a27f",
              "200": "#01efbb",
              "300": "#48fed7",
              "400": "#8ffee6",
              "500": "#a4ffeb",
              "600": "#b8ffef",
              "700": "#d1fff5",
              "800": "#ebfffb",
              "900": "#f5fffd",
              "DEFAULT": "#027a60",
              "foreground": "#f5fffd"
            },
            "divider": "#a3a3a3",
            "focus": "#0792E3",
            "foreground": {
              "50": "#262626",
              "100": "#525252",
              "200": "#787878",
              "300": "#a3a3a3",
              "400": "#c7c7c7",
              "500": "#d1d1d1",
              "600": "#dbdbdb",
              "700": "#e8e8e8",
              "800": "#f5f5f5",
              "900": "#fafafa",
              "DEFAULT": "#EDEDED",
              "foreground": "#262626"
            },
            "overlay": "#0F0F0F",
            "primary": {
              "50": "#01304b",
              "100": "#0267a1",
              "200": "#0497ec",
              "300": "#4abbfc",
              "400": "#90d5fd",
              "500": "#a5ddfe",
              "600": "#b9e5fe",
              "700": "#d2eefe",
              "800": "#ebf7ff",
              "900": "#f5fbff",
              "DEFAULT": "#0792E3"
            },
            "secondary": {
              "50": "#4d3800",
              "100": "#a37800",
              "200": "#f0b000",
              "300": "#ffce47",
              "400": "#ffe18f",
              "500": "#ffe7a3",
              "600": "#ffecb8",
              "700": "#fff3d1",
              "800": "#fffaeb",
              "900": "#fffcf5",
              "DEFAULT": "#FCB900"
            },
            "success": {
              "50": "#004d30",
              "100": "#00a367",
              "200": "#00f098",
              "300": "#47ffbc",
              "400": "#8fffd6",
              "500": "#a3ffdd",
              "600": "#b8ffe5",
              "700": "#d1ffee",
              "800": "#ebfff8",
              "900": "#f5fffb",
              "DEFAULT": "#00D184"
            },
            "warning": {
              "50": "#490316",
              "100": "#9c072f",
              "200": "#e50b45",
              "300": "#f7507c",
              "400": "#fa94af",
              "500": "#fba7be",
              "600": "#fcbbcc",
              "700": "#fdd3de",
              "800": "#feecf0",
              "900": "#fff5f8",
              "DEFAULT": "#EB154E"
            }
          },
          "extend": "dark"
        }
      },
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem"
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem"
        },
        radius: {
          small: "0.5rem",
          medium: "0.75rem",
          large: "0.875rem"
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px"
        },
        disabledOpacity: "0.5",
        dividerWeight: "1",
        hoverOpacity: "0.9"
      }
    })
  ],
};
