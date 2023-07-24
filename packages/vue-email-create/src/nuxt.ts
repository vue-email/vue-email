#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'

import prompts from 'prompts'
import { red, green, bold } from 'kolorist'

import renderTemplate from './utils/renderTemplate'
import getCommand from './utils/getCommand'
import renderEslint from './utils/renderEslintNuxt'
import { canSafelyOverwrite, isValidPackageName, toValidPackageName, emptyDir } from './utils/common'

export default async (options) => {
  const { argv, cwd, defaultProjectName, isFeatureFlagsUsed, forceOverwrite } = options
  let { targetDir } = options

  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    packageName?: string;
    needsEslint?: boolean;
  } = {}

  try {

    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Add ESLint for code quality?
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName),
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
            targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          },
        },
        {
          name: 'overwriteChecker',
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }

            return null
          },
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          name: 'needsEslint',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add ESLint for code quality?',
          initial: false,
          active: 'Yes',
          inactive: 'No',
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    projectName,
    packageName = projectName ?? defaultProjectName,
    shouldOverwrite = argv.force,
    needsEslint = argv.eslint,
  } = result
  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const pkg = { name: packageName, version: '0.0.0' }

  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'templates/nuxt')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)

    renderTemplate(templateDir, root)
  }

  // Render base template
  render('base')

  // Add configs.
  // Render ESLint config
  if (needsEslint) {
    renderEslint(root, { needsTypeScript: false, needsCypress: false, needsCypressCT: false, needsPrettier: false })
  }

  // Render code template.
  // prettier-ignore
  // const codeTemplate =
  // (needsTypeScript ? 'typescript-' : '') +
  // (needsRouter ? 'router' : 'default')

  // render(`code/${codeTemplate}`)

  // Render entry file (main.js/ts).
  // if (needsPinia && needsRouter) {
  //   render('entry/router-and-pinia')
  // } else if (needsPinia) {
  //   render('entry/pinia')
  // } else if (needsRouter) {
  //   render('entry/router')
  // } else {
  //   render('entry/default')
  // }

  // Cleanup.

  // We try to share as many files between TypeScript and JavaScript as possible.
  // If that's not possible, we put `.ts` version alongside the `.js` one in the templates.
  // So after all the templates are rendered, we need to clean up the redundant files.
  // (Currently it's only `cypress/plugin/index.ts`, but we might add more in the future.)
  // (Or, we might completely get rid of the plugins folder as Cypress 10 supports `cypress.config.ts`)

  // if (needsTypeScript) {
  // // Convert the JavaScript template to the TypeScript
  // // Check all the remaining `.js` files:
  // //   - If the corresponding TypeScript version already exists, remove the `.js` version.
  // //   - Otherwise, rename the `.js` file to `.ts`
  // // Remove `jsconfig.json`, because we already have tsconfig.json
  // // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
  //   preOrderDirectoryTraverse(
  //     root,
  //     () => {},
  //     (filepath) => {
  //       if (filepath.endsWith('.js')
  //     && !filepath.endsWith('postcss.config.js')
  //     && !filepath.endsWith('tailwind.config.js')) {
  //         const tsFilePath = filepath.replace(/\.js$/, '.ts')

  //         if (fs.existsSync(tsFilePath)) {
  //           fs.unlinkSync(filepath)
  //         } else {
  //           fs.renameSync(filepath, tsFilePath)
  //         }
  //       } else if (path.basename(filepath) === 'jsconfig.json') {
  //         fs.unlinkSync(filepath)
  //       }
  //     }
  //   )

  //   // Rename entry in `index.html`
  //   const indexHtmlPath = path.resolve(root, 'index.html')
  //   const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')

  //   fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))
  // } else {
  // Remove all the remaining `.ts` files
  // preOrderDirectoryTraverse(
  //   root,
  //   () => {},
  //   (filepath) => {
  //     if (filepath.endsWith('.ts')) {
  //       fs.unlinkSync(filepath)
  //     }
  //   }
  // )
  // }

  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  // Note: until <https://github.com/pnpm/pnpm/issues/3505> is resolved,
  // it is not possible to tell if the command is called by `pnpm init`.
  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  console.log('\nDone. Now run:\n')
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`)
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`)
  // if (needsPrettier) {
  //   console.log(`  ${bold(green(getCommand(packageManager, 'lint')))}`)
  // }
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`)
  console.log()
}
