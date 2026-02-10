---
sidebar_position: 4
title: "create-druid-ui"
description: Project scaffolding tool
---

# create-druid-ui

Scaffolding tool for creating new DruidUI projects.

## Usage

```bash
npx create-druid-ui <project-name> [options]

Options:
  --template <name>  Template (default: starter)
  --npm              Use npm
  --yarn             Use yarn
  --pnpm             Use pnpm
```

**Example:**

```bash
npx create-druid-ui my-dashboard
cd my-dashboard
npm install
npm run dev
```

## Generated Structure

```
my-app/
├── src/
│   └── index.tsx          # Entry point
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Templates

- `starter` (default) - Basic setup
- `simple` - Minimal example
- `extended` - With extensions

## Scripts

Generated `package.json` includes:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "druid-ui-build src/index.tsx",
    "preview": "vite preview",
    "gen-types": "druid-ui-gen-types druid-ui"
  }
}
```

## See Also

- [@druid-ui/component](./component.md)
- [@druid-ui/vite](./vite.md)
