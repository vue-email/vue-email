declare module 'vue/compiler-sfc' {
    interface SFCDescriptor {
        id: string;
    }
}
interface DefineConfigFunctions {
    render: (name: string, options?: RenderOptions) => Promise<string>;
}
type DefineConfig = (config: Options) => DefineConfigFunctions;
interface Options {
    dir: string;
    verbose?: boolean;
    input?: {
        templates?: {
            /**
             * Templates directory
             * @default {dir}/templates
             */
            dir?: string;
        };
    };
    output?: {
        /**
         * Output directory
         * @default {dir}/.vuemail
         */
        dir?: string;
        /**
         * Instantly generate all templates found in the templates directory.
         * If this is set to false, generate your templates with:
         *   - vuemail.compile(directory: string) - Generates all templates in directory.
         *     or
         *   - vuemail.compileTemplate(filename: string) - Generates a single template.
         * @default true
         */
        auto?: boolean;
    };
}
interface RenderOptions {
    props?: Record<string, unknown>;
}

declare const defineConfig: DefineConfig;

export { defineConfig };
