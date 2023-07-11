declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XAlert: typeof import('vue-email')['XBody']
  }
}

export {}
