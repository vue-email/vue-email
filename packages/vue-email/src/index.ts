import type { App } from "vue";
import * as components from "./components";
export * from "./types";
export * from "./utils";
export * from "./components";
export * from "./composables";

export interface VueEmailOptions {
  extends?: Record<string, unknown>;
}
export interface VueEmailPlugin {
  [key: string]: any;
  install: (app: App, options?: VueEmailOptions) => void;
}

const plugin: VueEmailPlugin = {
  install(app: App) {
    const Components = Object.keys(components).map(key => components[key as keyof object]);

    // Register core components
    Components.forEach((component: any) => {
      app.component(component.name, component);
    });
  }
};

export default plugin;
