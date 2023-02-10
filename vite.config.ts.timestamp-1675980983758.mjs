// vite.config.ts
import { defineConfig } from "file:///home/dave/Desktop/dev/projects/vue-email/node_modules/.pnpm/vite@4.1.1_@types+node@18.11.19/node_modules/vite/dist/node/index.js";
import path from "path";
import vue from "file:///home/dave/Desktop/dev/projects/vue-email/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.1+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import eslintPlugin from "file:///home/dave/Desktop/dev/projects/vue-email/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.33.0+vite@4.1.1/node_modules/vite-plugin-eslint/dist/index.mjs";
import dts from "file:///home/dave/Desktop/dev/projects/vue-email/node_modules/.pnpm/vite-plugin-dts@1.7.2_7rbuztiipedpplj3l6jjehnwyi/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/home/dave/Desktop/dev/projects/vue-email";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "vue-email"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kYXZlL0Rlc2t0b3AvZGV2L3Byb2plY3RzL3Z1ZS1lbWFpbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGF2ZS9EZXNrdG9wL2Rldi9wcm9qZWN0cy92dWUtZW1haWwvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGF2ZS9EZXNrdG9wL2Rldi9wcm9qZWN0cy92dWUtZW1haWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGVzbGludFBsdWdpbigpLFxuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ3Z1ZS1lbWFpbCcsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLG9CQUFvQjtBQUMxVSxPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sU0FBUztBQUpoQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
