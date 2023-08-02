'use strict';

const Path = require('node:path');
const node_url = require('node:url');
const compiler = require('vue/compiler-sfc');
const vue = require('vue');
const serverRenderer = require('vue/server-renderer');
const node_crypto = require('node:crypto');
const node_process = require('node:process');
const fs = require('node:fs');
const vueEmail = require('vue-email');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const Path__default = /*#__PURE__*/_interopDefaultCompat(Path);
const Path__namespace = /*#__PURE__*/_interopNamespaceCompat(Path);
const compiler__namespace = /*#__PURE__*/_interopNamespaceCompat(compiler);
const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

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
  return node_crypto.createHash("sha256").update(text).digest("hex").substring(0, 8);
}

function env(name) {
  return node_process.env[name];
}
const isProd = env("NODE_ENV") === "production";

function isDirectory(path) {
  return fs__default.statSync(path).isDirectory();
}
function isFile(path) {
  return fs__default.statSync(path).isFile();
}
function getDirectories(path) {
  return fs__default.readdirSync(path).map((name) => Path__default.join(path, name)).filter(isDirectory);
}
function getFiles(path) {
  return fs__default.readdirSync(path).map((name) => Path__default.join(path, name)).filter(isFile);
}
function getFilesRecursively(path) {
  const dirs = getDirectories(path);
  const files = dirs.map((dir) => getFilesRecursively(dir)).reduce((a, b) => a.concat(b), []);
  return files.concat(getFiles(path));
}
function readFile(path) {
  return fs__default.readFileSync(path, "utf-8").toString();
}
function writeFile(path, data) {
  fs__default.mkdirSync(path.substring(0, path.lastIndexOf(Path__default.sep)), {
    recursive: true
  });
  return fs__default.writeFileSync(path, data);
}

const scriptIdentifier = "_sfc_main";
const root = Path__namespace.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (document.currentScript && document.currentScript.src || new URL('compiler.cjs', document.baseURI).href))));
function compileTemplate(path, config) {
  const $path = Path__namespace.normalize(path);
  const component = compile($path);
  const name = path.split("/")[path.split("/").length - 1];
  const finalPath = Path__namespace.normalize(`${config?.output?.dir}/${name.replace(".vue", ".js")}`);
  writeFile(finalPath, component.trim());
}
async function templateRender(name, options, config) {
  const component = (await import(`${config?.output?.dir}/${name}.js`)).default;
  const app = vue.createApp(component, options?.props);
  app.use(vueEmail.VueEmailPlugin);
  const content = await serverRenderer.renderToString(app);
  return content;
}
function compile(path) {
  const source = readFile(path);
  const splittedPath = path.split("/");
  const filename = splittedPath[splittedPath.length - 1];
  let styles = null;
  const { descriptor, errors } = createDescriptor(filename, source, {
    compiler: compiler__namespace,
    root,
    isProd
  });
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
  const script = compiler__namespace.compileScript(descriptor, {
    id: descriptor.id,
    genDefaultAs: scriptIdentifier
  });
  if (descriptor.styles.length) {
    styles = compiler__namespace.compileStyle({
      id: `data-v-${descriptor.id}`,
      filename,
      source: descriptor.styles[0].content,
      scoped: descriptor.styles.some((s) => s.scoped)
    });
  }
  const template = compiler__namespace.compileTemplate({
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

exports.defineConfig = defineConfig;
