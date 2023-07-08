# Contributing
Wanna help? Awesome! There are many ways you can contribute.

## Improving the docs
Documentation is extremely important and takes a fair deal of time and effort to write and keep updated. Everything is written in [Markdown](https://www.markdownguide.org/) to facilitate the process of contributing.

::: details Docs Setup Guide

### Docs Setup Guide
1. Clone the repository:

```bash
git clone https://github.com/Dave136/vue-email.git
```

2. Install the dependencies:

```bash
pnpm install
``` 

3. Start the docs server:

```bash
pnpm run docs
```

4. Make your changes under the `docs` folder and see a live preview at [localhost:5173](http://localhost:5173/).

5. Submit a pull request with your changes.

:::



## Building new components

We’re open to expanding the catalog of components to cover as many use cases as possible. We suggest to open an issue for discussion first to make sure your idea is aligned with the project goals.

::: details Components Setup Guide

### Components Setup Guide
1. Add a new component under the <u>`packages/vue-email/src/components`</u> folder, and make sure to export it in the <u>`packages/vue-email/src/components/index.js`</u> file.
2. Don't forget to add tests. ( TO BE ADDED )
3. Submit a pull request with your changes.
:::

## Opening issues

Open an issue to report bugs or to propose new features.

* **Reporting bugs**: describe the bug as clearly as you can, including steps to reproduce, what happened and what you were expecting to happen. Also include browser version, OS and other related software’s (npm, Node.js, etc) versions when applicable.

* **Suggesting features**: explain the proposed feature, what it should do, why it is useful, how users should use it. Give us as much info as possible so it will be easier to discuss, access and implement the proposed feature. When you’re unsure about a certain aspect of the feature, feel free to leave it open for others to discuss and find an appropriate solution.

## Proposing pull requests

Pull requests are very welcome. Note that if you are going to propose drastic changes, be sure to open an issue for discussion first, to make sure that your PR will be accepted before you spend effort coding it.

* **Forking the repository**: clone it locally and create a branch for your proposed bug fix or new feature. Avoid working directly on the main branch.

* **Making changes**: implement your bug fix or feature, write tests to cover it and make sure all tests are passing. Then commit your changes, push your bug fix/feature branch to the origin (your forked repo) and open a pull request to the upstream (the repository you originally forked)‘s main branch.