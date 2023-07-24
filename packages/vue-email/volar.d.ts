declare module 'vue' {
  export interface GlobalComponents {
    EBody: typeof import('vue-email')['EBody']
    EButton: typeof import('vue-email')['EButton']
    EColumn: typeof import('vue-email')['EColumn']
    EContainer: typeof import('vue-email')['EContainer']
    EFont: typeof import('vue-email')['EFont']
    EHead: typeof import('vue-email')['EHead']
    EHeading: typeof import('vue-email')['EHeading']
    EHr: typeof import('vue-email')['EHr']
    EHtml: typeof import('vue-email')['EHtml']
    EImg: typeof import('vue-email')['EImg']
    ELink: typeof import('vue-email')['ELink']
    EMarkdown: typeof import('vue-email')['EMarkdown']
    EPreview: typeof import('vue-email')['EPreview']
    ERow: typeof import('vue-email')['ERow']
    ESection: typeof import('vue-email')['ESection']
    ETailwind: typeof import('vue-email')['ETailwind']
    EText: typeof import('vue-email')['EText']
    [key: string]: any
  }
}

export {}
