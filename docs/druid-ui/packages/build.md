---
sidebar_position: 3
title: "@druid-ui/build"
description: Build tools and CLI for compiling DruidUI components to WebAssembly
---

# @druid-ui/build

Build tools and CLI commands for compiling DruidUI components to WebAssembly. Handles TypeScript/JSX compilation, WASM componentization, and type generation.

## Installation

```bash
npm install --save-dev @druid-ui/build
```

## CLI Commands

### `druid-ui-build`

Compile a TypeScript/JSX component to WebAssembly.

```bash
druid-ui-build <input-file> [options]
```

**Arguments:**
- `<input-file>` - Entry point file (typically `src/index.tsx`)

**Options:**
- `--out <file>` - Output WASM file (default: `dist/component.wasm`)
- `--wit <dir>` - WIT directory for extensions (default: `wit`)
- `--world <name>` - Component model world name (default: `druid-ui`)

**Example:**

```bash
# Basic compilation
druid-ui-build src/index.tsx

# Custom output
druid-ui-build src/index.tsx --out build/my-component.wasm

# With extensions
druid-ui-build src/index.tsx --wit ./extensions
```

### `druid-ui-gen-types`

Generate TypeScript definitions from WIT files.

```bash
druid-ui-gen-types <world-name> [options]
```

**Arguments:**
- `<world-name>` - Component model world name

**Options:**
- `--wit-dir <dir>` - WIT files directory (default: `wit`)
- `--out-dir <dir>` - Output directory for types (default: `types`)

**Example:**

```bash
# Generate types for druid-ui world
druid-ui-gen-types druid-ui

# Custom directories
druid-ui-gen-types my-extension --wit-dir ./my-wit --out-dir ./generated
```

## Programmatic API

### `buildComponent()`

Compile a component programmatically.

```typescript
import { buildComponent } from '@druid-ui/build';

await buildComponent({
  entry: 'src/index.tsx',
  output: 'dist/component.wasm',
  witDir: 'wit',
  world: 'druid-ui'
});
```

**Options:**

```typescript
interface BuildOptions {
  entry: string;          // Entry file path
  output: string;         // Output WASM path
  witDir?: string;        // WIT directory (default: 'wit')
  world?: string;         // World name (default: 'druid-ui')
  minify?: boolean;       // Minify output (default: true)
  sourcemap?: boolean;    // Generate sourcemap (default: false)
}
```

### `generateTypes()`

Generate TypeScript types from WIT files.

```typescript
import { generateTypes } from '@druid-ui/build';

await generateTypes({
  world: 'druid-ui',
  witDir: 'wit',
  outDir: 'types'
});
```

## Build Pipeline

The build process involves several steps:

1. **TypeScript Compilation**
   - Compile TypeScript/JSX to JavaScript
   - Transform JSX to `d()` function calls
   - Bundle dependencies

2. **WebAssembly Componentization**
   - Convert JavaScript to WASM component
   - Apply Component Model types from WIT
   - Generate guest/host bindings

3. **Optimization**
   - Minify WASM output
   - Strip debug information (production)
   - Optimize for size

## Package Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "druid-ui-build src/index.tsx --out dist/component.wasm",
    "gen-types": "druid-ui-gen-types druid-ui --out-dir types",
    "dev": "vite"
  }
}
```

## Configuration

### tsconfig.json

Required TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react",
    "jsxFactory": "d",
    "jsxFragmentFactory": "Fragment",
    "types": ["@druid-ui/component/jsx"],
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### WIT Directory Structure

```
wit/
├── world.wit           # Main world definition
├── extensions/
│   └── my-api.wit      # Custom extensions
└── deps/
    └── ...             # Dependencies
```

**Example world.wit:**

```wit
package druid:ui;

world druid-ui {
  import ui: interface {
    d: func(...) -> string;
    log: func(msg: string);
    rerender: func();
  }
  
  // Your extensions
  import my-api: interface {
    fetch-data: func(url: string) -> string;
  }
  
  export init: func() -> string;
  export emit: func(fn-id: string, event: string);
}
```

## Build Optimization

### Production Build

```bash
# Optimized for size
druid-ui-build src/index.tsx --minify

# With debug info (larger file)
druid-ui-build src/index.tsx --sourcemap
```

### Bundle Analysis

Check WASM size:

```bash
ls -lh dist/component.wasm
# Typical size: 50-200 KB
```

## Advanced Usage

### Custom Build Script

```typescript
// scripts/build.ts
import { buildComponent, generateTypes } from '@druid-ui/build';
import { readFile, writeFile } from 'fs/promises';

async function customBuild() {
  // Generate types first
  await generateTypes({
    world: 'druid-ui',
    witDir: 'wit',
    outDir: 'types'
  });
  
  // Build component
  await buildComponent({
    entry: 'src/index.tsx',
    output: 'dist/component.wasm',
    witDir: 'wit',
    minify: process.env.NODE_ENV === 'production'
  });
  
  // Post-process (e.g., add metadata)
  const wasm = await readFile('dist/component.wasm');
  console.log(`Built component: ${wasm.length} bytes`);
}

customBuild().catch(console.error);
```

### Multi-Component Build

Build multiple components:

```typescript
import { buildComponent } from '@druid-ui/build';

const components = [
  { entry: 'src/dashboard.tsx', output: 'dist/dashboard.wasm' },
  { entry: 'src/settings.tsx', output: 'dist/settings.wasm' },
  { entry: 'src/admin.tsx', output: 'dist/admin.wasm' }
];

await Promise.all(
  components.map(config => buildComponent(config))
);
```

## Troubleshooting

### Build Fails with "Cannot find module"

Ensure all dependencies are installed:

```bash
npm install
```

Check `tsconfig.json` has correct `moduleResolution`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### WASM Too Large

Tips to reduce size:

1. Remove unused imports
2. Enable minification
3. Avoid large dependencies
4. Use code splitting (if supported)

```bash
# Check what's included
druid-ui-build src/index.tsx --analyze
```

### Type Generation Fails

Ensure WIT files are valid:

```bash
# Validate WIT syntax
wit-parser check wit/world.wit
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build DruidUI Component

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm install
      
      - run: npm run gen-types
      
      - run: npm run build
      
      - uses: actions/upload-artifact@v3
        with:
          name: component
          path: dist/component.wasm
```

## See Also

- [@druid-ui/component](./component.md) - Component runtime
- [@druid-ui/vite](./vite.md) - Vite plugin for development
- [create-druid-ui](./create-druid-ui.md) - Project scaffolding
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)
