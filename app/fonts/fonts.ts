import localFont from "next/font/local";

export const faustina = localFont({
  src: [
    { path: "./Faustina/Faustina-300.woff2", weight: "300" },
    { path: "./Faustina/Faustina-400.woff2", weight: "400" },
    { path: "./Faustina/Faustina-500.woff2", weight: "500" },
    { path: "./Faustina/Faustina-600.woff2", weight: "600" },
    { path: "./Faustina/Faustina-700.woff2", weight: "700" },
    { path: "./Faustina/Faustina-800.woff2", weight: "800" },
    // -Italic
    {
      path: "./Faustina/Faustina-Italic-300.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Faustina/Faustina-Italic-400.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Faustina/Faustina-Italic-500.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Faustina/Faustina-Italic-600.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./Faustina/Faustina-Italic-700.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./Faustina/Faustina-Italic-800.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--faustina",
  display: "swap",
});
export const merienda = localFont({
  src: [
    { path: "./Merienda/Merienda-300.woff2", weight: "300" },
    { path: "./Merienda/Merienda-400.woff2", weight: "400" },
    { path: "./Merienda/Merienda-500.woff2", weight: "500" },
    { path: "./Merienda/Merienda-600.woff2", weight: "600" },
    { path: "./Merienda/Merienda-700.woff2", weight: "700" },
    { path: "./Merienda/Merienda-800.woff2", weight: "800" },
    { path: "./Merienda/Merienda-900.woff2", weight: "900" },
  ],
  variable: "--merienda",
  display: "swap",
});
export const nosifer = localFont({
  src: "./Nosifer.woff2",
  variable: "--nosifer",
  weight: "400",
  display: "swap",
});
