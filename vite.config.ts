import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin";

// User site: https://MahmoudZakariaa.github.io — base stays "/"
export default defineConfig({
  base: "/",
  plugins: [react(), netlify()],
});
