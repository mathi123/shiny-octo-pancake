# Philosophy

This repository serves as a sandbox for testing new technologies and methodologies in software development. Our goal is to explore and evaluate tools and practices that contribute to building modern, robust, and future-proof complex applications. By experimenting with cutting-edge technologies, we aim to identify best practices and innovative solutions that can be applied to real-world projects.


# Getting Started

## Quickstart

To get started, you need [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/mathi123/shiny-octo-pancake.git shiny-octo-pancake && cd shiny-octo-pancake
pnpm i
pnpm run dev
```

# Technologies

## NextJs

NextJs was installed using [manual install](https://nextjs.org/docs/app/getting-started/installation#manual-installation) procedure. This contains a section on [typescript setup](https://nextjs.org/docs/app/getting-started/installation#ide-plugin) in VSCode.

## Typescript

The tsconfig file contains setting for compiling typescript. The following settings were modified:

- allowJs: set to false
- strict: set to true

## Commit message

Commit message must use [conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config.

## Linting

Eslint

## Node Version

The node version is indicated in .npmrc, and the pnpm version in package.json. These versions are also used on CI/CD. Be carefull to run commands with pnpm, not your local npm version.

## Package Log

This logs explains why packages were installed.

| Reason | Package(s) |
| - | - |
| NextJs setup | next@latest, react@latest, react-dom@latest |
| commit message linting | @commitlint/config-conventional ,@commitlint/cli, husky |
| eslint via next | eslint, eslint-config-next, eslint-config-prettier, @eslint/eslintrc |
