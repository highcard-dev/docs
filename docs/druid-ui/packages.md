---
sidebar_position: 2
title: NPM Packages
description: DruidUI package reference
---

# NPM Packages

## @druid-ui/component

Component runtime library.

```bash
npm install @druid-ui/component
```

### Exports

- `@druid-ui/component` - Main (WASM)
- `@druid-ui/component/raw` - Raw mode (dev)
- `@druid-ui/component/jsx` - JSX types
- `@druid-ui/component/types` - WIT types

### API

```tsx
import { createComponent, Context } from '@druid-ui/component';

let count = 0;

export const component = createComponent((ctx: Context) => {
  return (
    <button onClick={() => { count++; }}>
      Count: {count}
    </button>
  );
});
```

**Context:** `{ path: string, params: Record<string, string> }`

**State:** Use module-level variables (no hooks).

---

## @druid-ui/build

Build tools for compiling to WASM.

```bash
npm install --save-dev @druid-ui/build
```

### Commands

```bash
# Build to WASM
druid-ui-build src/index.tsx --out dist/component.wasm

# Generate types from WIT
druid-ui-gen-types druid-ui --out-dir types
```

### Programmatic

```typescript
import { buildComponent } from '@druid-ui/build';

await buildComponent({
  entry: 'src/index.tsx',
  output: 'dist/component.wasm'
});
```

---

## create-druid-ui

Project scaffolding.

```bash
npx create-druid-ui my-app
```

**Options:**
- `--template <name>` - starter | simple | extended
- `--npm | --yarn | --pnpm` - Package manager

**Generated:**
- `src/index.tsx` - Entry point
- `vite.config.ts` - Vite config
- `tsconfig.json` - TypeScript config

---

## @druid-ui/vite

Vite plugin with hot reload.

```bash
npm install --save-dev @druid-ui/vite
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import druidUI from '@druid-ui/vite';

export default defineConfig({
  plugins: [
    druidUI({
      sandbox: false,  // Disable WASM in dev
      debug: true
    })
  ]
});
```

**Modes:**
- `sandbox: false` - Fast, not sandboxed (dev)
- `sandbox: true` - Production-like, slow (testing)

---

## @druid-ui/host

Browser runtime (usually auto-installed).

```bash
npm install @druid-ui/host
```

### Custom Element

```html
<druid-ui 
  src="/component.wasm"
  no-sandbox
  path="/dashboard"
></druid-ui>
```

### JavaScript API

```typescript
const el = document.querySelector('druid-ui') as DruidUIElement;

// Disable sandbox
el.sandbox = false;

// Provide extension APIs
el.extensionObject = {
  'my:api/fetch': {
    getData: async (url: string) => {
      return await fetch(url).then(r => r.text());
    }
  }
};

// Force rerender
el.rerender();
```

**Security:** WASM components can only access explicitly provided functions.

---

## Learn More

- [DruidUI Source](https://github.com/highcard-dev/druid-ui)
- [Examples](https://github.com/highcard-dev/druid-ui/tree/main/examples)
- [Component Model](https://component-model.bytecodealliance.org/)
