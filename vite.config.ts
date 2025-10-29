import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ Vite config for GitHub Pages (repo name: DexNotePro)
export default defineConfig(({ mode }) => ({
  base: '/DexNotePro/', // 👈 Important: matches your GitHub repo name
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
