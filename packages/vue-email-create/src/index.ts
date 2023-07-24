#!/usr/bin/env node

import minimist from 'minimist'
import prompts from 'prompts'
import { red } from 'kolorist'

// import banner from './utils/banner'

import createNuxtProject from './nuxt'

async function init() {
  // console.log(`\n${banner}\n`)
  console.log('\n💌 Vue Email\n')

  const cwd = process.cwd()
  // possible options:
  // --default
  // --typescript / --ts
  // --jsx
  // --router / --vue-router
  // --pinia
  // --with-tests / --tests (equals to `--vitest --cypress`)
  // --vitest
  // --cypress
  // --eslint
  // --eslint-with-prettier (only support prettier through eslint for simplicity)
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    // all arguments are treated as booleans
    boolean: true,
  })

  // if any of the feature flags is set, we would skip the feature prompts
  const isFeatureFlagsUsed =
    typeof (
      argv.default ??
      argv.ts ??
      argv.jsx ??
      argv.router ??
      argv.pinia ??
      argv.tests ??
      argv.vitest ??
      argv.cypress ??
      argv.eslint
    ) === 'boolean'

  const [targetDir] = argv._
  const defaultProjectName = !targetDir ? 'vue-email-starter' : targetDir

  const forceOverwrite = argv.force

  let projectResult: {
    projectType?: 'nuxt';
  } = {}

  try {
    projectResult = await prompts([{
      type: 'select',
      name: 'projectType',
      message: 'Project type:',
      choices: [
        { title: 'Nuxt 3', value: 'nuxt' },
      ],
    }],
    {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled')
      },
    })
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  const { projectType } = projectResult

  if (projectType === 'nuxt') await createNuxtProject({ argv, cwd, defaultProjectName, targetDir, isFeatureFlagsUsed, forceOverwrite })
}

init().catch((e) => {
  console.error(e)
})
