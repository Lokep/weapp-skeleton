// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import uni from "@dcloudio/vite-plugin-uni";
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },

    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/static/styles/var.scss";',
      },
    }
  },
  plugins: [uni(), uniTailwind()],
});