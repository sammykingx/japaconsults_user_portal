import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      data: `${path.resolve(__dirname, "./src/data/")}`,
      features: `${path.resolve(__dirname, "./src/features/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts/")}`,
    }

  }
})
