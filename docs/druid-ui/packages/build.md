---
sidebar_position: 3
title: "@druid-ui/build"
description: Build tools for compiling to WASM
---

# @druid-ui/build

Build tools and CLI for compiling DruidUI components to WebAssembly.

## Installation

```bash
npm install --save-dev @druid-ui/build
```

## CLI Commands

### `druid-ui-build`

Compile TypeScript/JSX to WASM:

```bash
druid-ui-build <input> [options]

Options:
  --out <file>    Output WASM file (default: dist/component.wasm)
  --wit <dir>     WIT directory (default: wit)
  --world <name>  World name (default: druid-ui)
```

**Example:**

```bash
druid-ui-build src/index.tsx --out build/app.wasm
```

### `druid-ui-gen-types`

Generate TypeScript types from WIT files:

```bash
druid-ui-gen-types <world> [options]

Options:
  --wit-dir <dir>   WIT directory (default: wit)
  --out-dir <dir>   Output directory (default: types)
```

**Example:**

```bash
druid-ui-gen-types druid-ui --out-dir generated
```

## Programmatic API

```typescript
import { buildComponent, generateTypes } from '@druid-ui/build';

// Build component
await buildComponent({
  entry: 'src/index.tsx',
  output: 'dist/component.wasm',
  witDir: 'wit',
  world: 'druid-ui'
});

// Generate types
await generateTypes({
  world: 'druid-ui',
  witDir: 'wit',
  outDir: 'types'
});
```

## Package Scripts

```json
{
  "scripts": {
    "build": "druid-ui-build src/index.tsx",
    "gen-types": "druid-ui-gen-types druid-ui",
    "dev": "vite"
  }
}
```

## See Also

- [@druid-ui/component](./component.md)
- [@druid-ui/vite](./vite.md)
