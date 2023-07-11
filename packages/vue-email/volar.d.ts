declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XBody: typeof import('vue-email')['XBody']
    XButton: typeof import('vue-email')['XButton']
    XColumn: typeof import('vue-email')['XColumn']
    XContainer: typeof import('vue-email')['XContainer']
    XFont: typeof import('vue-email')['XFont']
    XHead: typeof import('vue-email')['XHead']
    XHeading: typeof import('vue-email')['XHeading']
    XHr: typeof import('vue-email')['XHr']
    XHtml: typeof import('vue-email')['XHtml']
    XImg: typeof import('vue-email')['XImg']
    XLink: typeof import('vue-email')['XLink']
    XPreview: typeof import('vue-email')['XPreview']
    XRow: typeof import('vue-email')['XRow']
    XSection: typeof import('vue-email')['XSection']
    XTailwind: typeof import('vue-email')['XTailwind']
    XText: typeof import('vue-email')['XText']
  }
}

export {}
