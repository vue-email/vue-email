import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from "@nuxt/kit";
import { fileURLToPath } from "node:url";

export default defineNuxtModule({
  meta: {
    name: "vue-email",
    configKey: "vueEmail",
  },
  defaults: {},
  setup(options, nuxt) {
    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url);

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({ types: "./dist/types" });
    });

    // nuxt install
    addComponentsDir({
      path: fileURLToPath(new URL("./dist/components", import.meta.url)),
      extensions: ["vue", "tsx"],
      prefix: "E",
    });

    addImportsDir(resolve("./dist/composables"));
  },
});
