import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * Use relative base path so that assets will resolve to the
   * repo path (e.g. <user>.github.io/<repo>) instead of the
   * root URL (<user>.github.io)
   *
   * - https://vitejs.dev/config/shared-options.html#base
   * - https://vitejs.dev/guide/static-deploy.html#github-pages
   */
  base: "./",
});
