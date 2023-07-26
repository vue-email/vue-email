import { defineNuxtModule, addImportsSources, addComponent } from "@nuxt/kit";

const components = [
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
  'EMarkdown'
];


export default defineNuxtModule({
  meta: {
    name: "vue-email",
    configKey: "vueEmail"
  },
  defaults: {},
  setup() {
    components.forEach(component => {
      addComponent({
        name: component,
        export: component,
        filePath: 'vue-email',
      });
    });

    addImportsSources({
      from: 'vue-email',
      imports: ['useRender']
    })
  }
});
