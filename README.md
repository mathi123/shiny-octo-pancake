# Philosophy

This repository serves as a sandbox for testing new technologies and methodologies in software development. Our goal is to explore and evaluate tools and practices that contribute to building modern, robust, and future-proof complex applications. By experimenting with cutting-edge technologies, we aim to identify best practices and innovative solutions that can be applied to real-world projects.

# Getting Started

## Quickstart

To get started, you need [pnpm](https://pnpm.io/) and [docker](https://www.docker.com/).

```bash
git clone https://github.com/mathi123/shiny-octo-pancake.git shiny-octo-pancake
cd shiny-octo-pancake
pnpm i
pnpm run dev
```

# Technologies

## Next.js

Next.js was installed using [manual install](https://nextjs.org/docs/app/getting-started/installation#manual-installation) procedure. This contains a section on [TypeScript setup](https://nextjs.org/docs/app/getting-started/installation#ide-plugin) in VS Code.

## TypeScript

The tsconfig file contains settings for compiling TypeScript. The following settings were modified:

- allowJs: set to false
- strict: set to true

In order for @/... imports to work, the following config was added:

```json
    "baseUrl": ".",
    "paths": {
      "@/*": ["app/*"]
    }
```

## Commit message

Commit messages must use the [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) config.

## Linting

ESLint was set up to use 3 rule sets:

- Next.js rules
- TypeScript rules
- Prettier rules (such that they don't conflict)

## Formatting

Prettier is used to automatically format code.

## Node Version

The Node.js version is indicated in .npmrc, and the pnpm version in package.json. These versions are also used on CI/CD. Be careful to run commands with pnpm, not your local npm version.

## Testing

### Unit Tests

Vitest is used for running unit tests.

```bash

pnpm run test

```

## Database

### ORM

Prisma is used as an ORM. Modify the schema.prisma file, and add a migration as follows:

```bash
pnpm run db:migrate
```

Notes:

- Neon Adapter is used on production and Pg Adapter for local development
- To check: [connection pooling](https://vercel.com/guides/connection-pooling-with-functions) still relevant with Neon driver?

## Env Vars

| Variable              | Description                                      |
| --------------------- | ------------------------------------------------ |
| DATABASE_URL          | The database url.                                |
| DATABASE_URL_UNPOOLED | Direct database url, without connection pooling. |

## Package Log

This log explains why packages were installed.

| Reason                 | Package(s)                                                           |
| ---------------------- | -------------------------------------------------------------------- |
| Next.js setup          | next@latest, react@latest, react-dom@latest                          |
| commit message linting | @commitlint/config-conventional, @commitlint/cli, husky              |
| ESLint via Next.js     | eslint, eslint-config-next, eslint-config-prettier, @eslint/eslintrc |
| validating models      | zod                                                                  |
| prisma ORM setup       | prisma, @prisma/client, @prisma/adapter-neon                         |

## Known Issues

### Turbopack

TurboPack and @prisma/pg-adapter don't work well together, for pnpm. The following error is thrown when instantiating the adapter.

```bash
Package pg can't be external
The request pg matches serverExternalPackages (or the default list).
The request could not be resolved by Node.js from the project directory.
Packages that should be external need to be installed in the project directory, so they can be resolved from the output files.
Try to install it into the project directory by running npm install pg from the project directory.
```

A temporary fix was to modify the .npmrc file as mentioned [here](https://github.com/vercel/next.js/discussions/76247).

```.npmrc
public-hoist-pattern[]=*pg*
```
