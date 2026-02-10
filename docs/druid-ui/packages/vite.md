---
sidebar_position: 5
title: "@druid-ui/vite"
description: Vite plugin for hot reload
---

# @druid-ui/vite

Vite plugin for DruidUI development with hot module replacement.

## Installation

```bash
npm install --save-dev @druid-ui/vite
```

## Usage

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import druidUI from '@druid-ui/vite';

export default defineConfig({
  plugins: [druidUI()]
});
```

## Options

```typescript
interface DruidUIPluginOptions {
  sandbox?: boolean;      // Enable WASM sandbox (default: false in dev)
  witDir?: string;        // Custom WIT directory
  entry?: string;         // Custom entry point
  debug?: boolean;        // Verbose logging
}
```

**Example:**

```typescript
export default defineConfig({
  plugins: [
    druidUI({
      sandbox: false,      // Disable WASM in dev
      debug: true
    })
  ]
});
```

## Development Modes

### Raw Mode (Fast)

```typescript
druidUI({ sandbox: false })
```

- Instant hot reload
- Normal debugging
- Not sandboxed (dev only)

### Sandbox Mode

```typescript
druidUI({ sandbox: true })
```

- Production-like
- True sandboxing
- Slower reload

## HTML Template

Auto-served:

```html
<!DOCTYPE html>
<html>
  <body>
    <druid-ui src="/src/index.tsx"></druid-ui>
    <script type="module" src="/@druid-ui/client"></script>
  </body>
</html>
```

## See Also

- [@druid-ui/component](./component.md)
- [@druid-ui/build](./build.md)
- [Vite Documentation](https://vite.dev)
