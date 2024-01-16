import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import compression from "./node_modules/vite-plugin-compression2/dist/index";
import imagemin from "unplugin-imagemin/vite";
import { chunkSplitPlugin } from "./node_modules/vite-plugin-chunk-split/dist/index";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 8 * 1024,
  },
  plugins: [
    vue(),
    compression(),
    imagemin(),
    // 这个插件已经有报错了
    chunkSplitPlugin({
      customSplitting: {
        "vue-system": ["vue", "vue-router", "vuex"],
        " utils": ["./src/utils"],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:1337",
      "/upload": "http://localhost:1337",
    },
  },
});
