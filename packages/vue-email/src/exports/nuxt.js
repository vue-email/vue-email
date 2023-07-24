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
    compatibility: {
      nuxt: "^3.0.0-rc.1",
    },
  },
  defaults: {},
  setup(options, nuxt) {
    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url);

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({ types: "../src/types" });
    });

    // nuxt install
    addComponentsDir({
      path: fileURLToPath(new URL("../src/components", import.meta.url)),
      extensions: ["vue", "tsx"],
      prefix: "E",
    });

    addImportsDir(resolve("../src/composables"));
  },
});
