import autoprefixer from "autoprefixer";
import { resolve } from "path";
import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  root: "./src",
  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  optimizeDeps: {
    include: ["lazysizes/plugins/parent-fit/ls.parent-fit"],
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src", "assets"),
      "@css": resolve(__dirname, "src/assets", "css"),
      "@js": resolve(__dirname, "src/assets", "js"),
      "@img": resolve(__dirname, "src/assets", "img"),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src", "index.html"),
      },
    },
  },
});
