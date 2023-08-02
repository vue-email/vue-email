import * as Path from 'node:path';
import Path__default from 'node:path';
import { fileURLToPath } from 'node:url';
import * as compiler from 'vue/compiler-sfc';
import { createApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createHash } from 'node:crypto';
import { env as env$1 } from 'node:process';
import fs from 'node:fs';
import { VueEmailPlugin } from 'vue-email';

function isObject(item) {
  return !!item && typeof item === "object" && !Array.isArray(item);
}
function deepmerge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        deepmerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return deepmerge(target, ...sources);
}

function createInitConfig(options) {
  const config = deepmerge(
    {
      dir: options.dir,
      verbose: false,
      input: {
        templates: {
          dir: `${options.dir}/templates`
        }
      },
      output: {
        auto: true,
        dir: `${options.dir}/.vuemail`
      }
    },
    options
  );
  return config;
}

function createDescriptor(filename, source, { root, isProd, compiler }) {
  const { descriptor, errors } = compiler.parse(source, {
    filename
  });
  const normalizedPath = Path__default.normalize(Path__default.relative(root, filename));
  descriptor.id = generateId(normalizedPath + (isProd ? source : ""));
  return { descriptor, errors };
}
function generateId(text) {
  return createHash("sha256").update(text).digest("hex").substring(0, 8);
}

function env(name) {
  return env$1[name];
}
const isProd = env("NODE_ENV") === "production";

function isDirectory(path) {
  return fs.statSync(path).isDirectory();
}
function isFile(path) {
  return fs.statSync(path).isFile();
}
function getDirectories(path) {
  return fs.readdirSync(path).map((name) => Path__default.join(path, name)).filter(isDirectory);
}
function getFiles(path) {
  return fs.readdirSync(path).map((name) => Path__default.join(path, name)).filter(isFile);
}
function getFilesRecursively(path) {
  const dirs = getDirectories(path);
  const files = dirs.map((dir) => getFilesRecursively(dir)).reduce((a, b) => a.concat(b), []);
  return files.concat(getFiles(path));
}
function readFile(path) {
  return fs.readFileSync(path, "utf-8").toString();
}
function writeFile(path, data) {
  fs.mkdirSync(path.substring(0, path.lastIndexOf(Path__default.sep)), {
    recursive: true
  });
  return fs.writeFileSync(path, data);
}

const scriptIdentifier = "_sfc_main";
const root = Path.dirname(fileURLToPath(import.meta.url));
function compileTemplate(path, config) {
  const $path = Path.normalize(path);
  const component = compile($path);
  const name = path.split("/")[path.split("/").length - 1];
  const finalPath = Path.normalize(`${config?.output?.dir}/${name.replace(".vue", ".js")}`);
  writeFile(finalPath, component.trim());
}
async function templateRender(name, options, config) {
  const component = (await import(`${config?.output?.dir}/${name}.js`)).default;
  const app = createApp(component, options?.props);
  app.use(VueEmailPlugin);
  const content = await renderToString(app);
  return content;
}
function compile(path) {
  const source = readFile(path);
  const splittedPath = path.split("/");
  const filename = splittedPath[splittedPath.length - 1];
  let styles = null;
  const { descriptor, errors } = createDescriptor(filename, source, {
    compiler,
    root,
    isProd
  });
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
  const script = compiler.compileScript(descriptor, {
    id: descriptor.id,
    genDefaultAs: scriptIdentifier
  });
  if (descriptor.styles.length) {
    styles = compiler.compileStyle({
      id: `data-v-${descriptor.id}`,
      filename,
      source: descriptor.styles[0].content,
      scoped: descriptor.styles.some((s) => s.scoped)
    });
  }
  const template = compiler.compileTemplate({
    filename,
    id: descriptor.id,
    source: descriptor.template.content,
    compilerOptions: {
      bindingMetadata: script.bindings
    }
  });
  const output = `
  ${template.code}

  ${script.content}
  ${styles ? `const styles = \`${styles.code}\`` : ""}
  ${scriptIdentifier}.render = render
  ${styles ? `${scriptIdentifier}.style = styles` : ""}
  export default _sfc_main
  `;
  return output;
}

const defineConfig = (config) => {
  const defaultConfig = createInitConfig(config);
  const dir = config?.dir ?? defaultConfig?.dir;
  const files = getFilesRecursively(dir);
  for (const path of files.filter((file) => !file.includes(".vuemail"))) {
    compileTemplate(path, defaultConfig);
  }
  return {
    render: (name, options) => templateRender(name, options, defaultConfig)
  };
};

export { defineConfig };
