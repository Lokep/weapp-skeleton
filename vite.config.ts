import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import postcssWeappTailwindcssRename from 'weapp-tailwindcss-webpack-plugin/postcss';

const isH5 = process.env.UNI_PLATFORM === 'h5';
const postcssPlugins = [require("autoprefixer")(), require("tailwindcss")()];

if (!isH5) {
  postcssPlugins.push(postcssWeappTailwindcssRename({}))
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],

  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
});
