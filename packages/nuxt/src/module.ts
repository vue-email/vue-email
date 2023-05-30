import { addComponent, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit';

type ComponentName =
  | 'EBody'
  | 'EButton'
  | 'EColumn'
  | 'EContainer'
  | 'EFont'
  | 'EHead'
  | 'EHeading'
  | 'EHr'
  | 'EHtml'
  | 'EImg'
  | 'ELink'
  | 'EPreview'
  | 'ERow'
  | 'ESection'
  | 'EText'
  | 'ETailwind';

const components: ComponentName[] = [
  'EBody',
  'EButton',
  'EColumn',
  'EContainer',
  'EFont',
  'EHead',
  'EHeading',
  'EHr',
  'EHtml',
  'EImg',
  'ELink',
  'EPreview',
  'ERow',
  'ESection',
  'EText',
  'ETailwind',
];

export interface VueEmailNuxtOptions {
  /** Choose auto imports all components or not */
  autoImports?: boolean;
  /** Rename any component */
  componentNames?: Partial<Record<ComponentName, string>>;
}

export default defineNuxtModule<VueEmailNuxtOptions>({
  meta: {
    name: 'vue-email',
    configKey: 'vue-email',
  },
  defaults: {
    autoImports: true,
    componentNames: {},
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    if (options.autoImports) {
      components.forEach((component) => {
        addComponent({
          name: options.componentNames?.[component] ?? component,
          export: component,
          filePath: 'vue-email',
        });
      });
    }

    addImportsDir(resolve('./runtime/'));
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    'vue-email'?: VueEmailNuxtOptions;
  }

  interface NuxtOptions {
    'vue-email'?: VueEmailNuxtOptions;
  }
}
