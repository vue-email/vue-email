#!/bin/bash

set -xe

# Restore all git changes
git restore -s@ -SW  -- packages

# Update token
if [[ ! -z ${NODE_AUTH_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  npm whoami
fi

# Release packages
for p in packages/* ; do
  if [[ $p == "packages/playground" ]]; then
    continue
  fi

  pushd $p
  echo "Publishing $p"
  cp ../../LICENSE .
  # cp ../../README.md .
  pnpm publish --access public --no-git-checks
  popd
done
