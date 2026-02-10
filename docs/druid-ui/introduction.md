---
sidebar_position: 1
title: DruidUI
description: WebAssembly framework for sandboxed UIs
---

# DruidUI

DruidUI is a React-like framework that compiles to **WebAssembly** for building sandboxed user interfaces. Use it when you need to run untrusted UI code safely.

## Why WebAssembly?

Traditional approaches can't provide true sandboxing:
- **JavaScript** - Can access all browser APIs
- **iframes** - Limited state sharing, poor UX

**WebAssembly** provides complete isolation - code can only access explicitly granted functions.

## Quick Start

```bash
npx create-druid-ui my-app
cd my-app
npm install
npm run dev
```

### Hello World

```tsx
import { createComponent, Context } from '@druid-ui/component';

let count = 0;

export const component = createComponent((ctx: Context) => {
  return (
    <main>
      <h1>Hello Druid!</h1>
      <button onClick={() => { count++; }}>
        Clicked {count} times
      </button>
    </main>
  );
});
```

### Build & Deploy

```bash
# Build to WASM
npm run build  # → dist/component.wasm

# Add to scroll
ui:
  - name: dashboard
    path: ui/dashboard.wasm
    route: /admin
```

## Core Concepts

### Functional Components

Similar to [React](https://react.dev) and [Mithril.js](https://mithril.js.org/):

- JSX/TSX syntax
- Every event triggers full rerender (no complex diffing)
- Module-level state (no hooks)

```tsx
let items = ['todo 1', 'todo 2'];

export const component = createComponent(() => {
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  );
});
```

### Context

Access route data via context:

```tsx
export const component = createComponent((ctx: Context) => {
  return (
    <div>
      <p>Path: {ctx.path}</p>
      <p>User ID: {ctx.params.userId}</p>
    </div>
  );
});
```

### Shadow DOM

Each component renders in isolated Shadow DOM - styles can't leak in/out.

## Development Workflow

### Raw Mode (Fast)

Develop without WASM overhead:

```html
<druid-ui no-sandbox src="/src/index.tsx"></druid-ui>
```

- Instant hot reload
- Normal browser debugging
- Not sandboxed (dev only!)

### Sandbox Mode (Production)

Full WASM sandboxing:

```bash
npm run build
npm run preview
```

- True isolation
- Production-ready
- Slower iteration

## Extension System

By default, WASM can only call `d()`, `log()`, and `rerender()`. Add custom APIs via extensions:

**1. Define interface (WIT):**

```wit
package my:api;

interface fetch {
  get-data: func(url: string) -> string;
}
```

**2. Implement in host:**

```js
druidElement.extensionObject = {
  'my:api/fetch': {
    getData: async (url) => {
      const res = await fetch(url);
      return res.text();
    }
  }
};
```

**3. Use in component:**

```tsx
import { getData } from 'my:api/fetch';

const data = await getData('/api/status');
```

See [package documentation](./packages/component.md) for full API reference.

## Multi-Language Support

**Current:** JavaScript/TypeScript ✅

**Planned:** Rust, C++ (waiting for WebAssembly Component Model maturity)

## Limitations

- No async/await yet (use callback workaround)
- Full rerenders on every event (less efficient than React)
- JavaScript only for now
- No SSR

## Learn More

- [NPM Packages](./packages/component.md) - API reference
- [Examples](https://github.com/highcard-dev/druid-ui/tree/main/examples)
- [Source Code](https://github.com/highcard-dev/druid-ui)
