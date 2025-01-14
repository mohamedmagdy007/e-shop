import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
});
