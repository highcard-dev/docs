---
sidebar_position: 5
title: "@druid-ui/vite"
description: Vite plugin for DruidUI development with hot module replacement
---

# @druid-ui/vite

Vite plugin that provides hot module replacement, fast refresh, and development server integration for DruidUI components.

## Installation

```bash
npm install --save-dev @druid-ui/vite
```

## Basic Usage

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import druidUI from '@druid-ui/vite';

export default defineConfig({
  plugins: [druidUI()]
});
```

### Start Development Server

```bash
vite
# → http://localhost:5173
```

## Features

- **Hot Module Replacement** - Instant updates without page reload
- **Fast Refresh** - Preserves component state across edits
- **Sandbox Toggle** - Switch between WASM and raw mode
- **TypeScript Support** - Full type checking
- **Source Maps** - Debug TypeScript in browser

## Plugin Options

```typescript
interface DruidUIPluginOptions {
  // Enable/disable sandbox by default
  sandbox?: boolean;
  
  // Custom WIT directory
  witDir?: string;
  
  // Custom entry point
  entry?: string;
  
  // Enable verbose logging
  debug?: boolean;
}
```

**Example with options:**

```typescript
export default defineConfig({
  plugins: [
    druidUI({
      sandbox: false,      // Disable WASM in dev
      witDir: './extensions',
      debug: true
    })
  ]
});
```

## Development Modes

### Raw Mode (Fast)

Development without WASM compilation:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    druidUI({ sandbox: false })
  ]
});
```

**Benefits:**
- ✅ Instant hot reload
- ✅ Normal debugging
- ✅ Faster iteration

**Limitations:**
- ❌ Not sandboxed
- ❌ May behave differently than production

### Sandbox Mode (Production-like)

Development with WASM compilation:

```typescript
export default defineConfig({
  plugins: [
    druidUI({ sandbox: true })
  ]
});
```

**Benefits:**
- ✅ Production-like environment
- ✅ True sandboxing
- ✅ Catches WASM-specific issues

**Limitations:**
- ❌ Slower hot reload
- ❌ More complex debugging

## HTML Template

The plugin serves this HTML automatically:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>DruidUI App</title>
  </head>
  <body>
    <druid-ui src="/src/index.tsx"></druid-ui>
    <script type="module" src="/@druid-ui/client"></script>
  </body>
</html>
```

### Custom HTML

Create `index.html` in project root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My DruidUI App</title>
    <style>
      body { margin: 0; padding: 2rem; }
    </style>
  </head>
  <body>
    <h1>My Dashboard</h1>
    <druid-ui src="/src/index.tsx" no-sandbox></druid-ui>
    <script type="module" src="/@druid-ui/client"></script>
  </body>
</html>
```

## Client API

Import client utilities:

```typescript
import { DruidUIElement } from '@druid-ui/vite/client';

// Access the custom element
const element = document.querySelector('druid-ui') as DruidUIElement;

// Toggle sandbox mode
element.sandbox = false;

// Provide extension APIs
element.extensionObject = {
  'my:api/fetch': {
    fetchData: async (url: string) => {
      const res = await fetch(url);
      return res.text();
    }
  }
};
```

## Extension Integration

### Define Extensions

```wit
// wit/extensions.wit
package my:api;

interface fetch {
  fetch-data: func(url: string) -> string;
}
```

### Provide in Development

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import druidUI from '@druid-ui/vite';

export default defineConfig({
  plugins: [
    druidUI({
      witDir: './wit'
    })
  ]
});
```

### Use in Component

```typescript
import { fetchData } from 'my:api/fetch';

export const component = createComponent(async () => {
  const data = await fetchData('/api/status');
  return <pre>{data}</pre>;
});
```

## Hot Reload Behavior

### Auto-Reload Triggers

- ✅ TypeScript/JSX changes in `src/`
- ✅ CSS changes
- ✅ HTML template changes
- ✅ WIT file changes (sandbox mode)

### State Preservation

The plugin attempts to preserve state during hot reload:

```typescript
// State is preserved across hot reloads
let counter = 0;

export const component = createComponent(() => {
  return <button onClick={() => { counter++; }}>
    Count: {counter}
  </button>;
});
```

**Note:** Deep component tree changes may lose state.

## Debugging

### Browser DevTools

**Raw mode:**
- Use Chrome DevTools normally
- Set breakpoints in TypeScript
- Inspect component state

**Sandbox mode:**
- WASM debugging limited
- Use `console.log()` / `debug_print()`
- Check Network tab for WASM loads

### Plugin Logging

Enable debug mode:

```typescript
export default defineConfig({
  plugins: [
    druidUI({ debug: true })
  ]
});
```

Logs to console:
- Hot reload events
- WASM compilation
- Extension loading

## Build Integration

The Vite plugin only runs in development. For production builds, use `@druid-ui/build`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "druid-ui-build src/index.tsx"
  }
}
```

## Advanced Configuration

### Multiple Components

Serve multiple components:

```html
<druid-ui src="/src/dashboard.tsx"></druid-ui>
<druid-ui src="/src/settings.tsx"></druid-ui>
```

### Custom Server Port

```typescript
export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  plugins: [druidUI()]
});
```

### Proxy API Requests

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  plugins: [druidUI()]
});
```

## Troubleshooting

### Hot reload not working

Clear Vite cache:

```bash
rm -rf node_modules/.vite
vite
```

### WASM compilation fails

Check WIT files are valid:

```bash
npx druid-ui-gen-types druid-ui --wit-dir wit
```

### Port already in use

Change port in `vite.config.ts` or use:

```bash
vite --port 3000
```

## See Also

- [@druid-ui/component](./component.md) - Component API
- [@druid-ui/build](./build.md) - Production builds
- [@druid-ui/host](./host.md) - Browser runtime
- [Vite Documentation](https://vite.dev)
