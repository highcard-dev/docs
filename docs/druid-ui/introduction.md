---
sidebar_position: 1
title: DruidUI Introduction
description: Learn about DruidUI, Druid's WebAssembly-based framework for building sandboxed user interfaces
---

# DruidUI - WebAssembly SPA Framework

DruidUI is a lightweight React-like framework that compiles to **WebAssembly**. It enables you to build custom user interfaces for your Druid scrolls (game servers) in a **fully sandboxed environment**.

## What is DruidUI?

DruidUI is a frontend framework specifically designed for scenarios where you need to support **user-generated content and UIs** on your platform. Unlike traditional frameworks that run JavaScript directly, DruidUI components are compiled to WebAssembly, providing complete isolation and security.

### Key Features

✅ **React-like Components** - Familiar JSX/TSX syntax  
✅ **WebAssembly Sandbox** - Complete code isolation  
✅ **Multi-language** - JavaScript/TypeScript ready, Rust/C++ coming soon  
✅ **Hot Reloading** - Fast development workflow with Vite  
✅ **Extension System** - Extend functionality with custom APIs  
✅ **Component Model** - Based on WebAssembly Component Model standard

## Why DruidUI?

### The Problem

When building platforms that allow users to create custom UIs (like game server dashboards), you face a security dilemma:

- **JavaScript**: Fast, but can't be sandboxed properly
- **iframes**: Limited, can't share state with host
- **eval()**: Dangerous, full system access

### The Solution

**WebAssembly provides true sandboxing:**

```
User Code → Compile to WASM → Run in isolated environment
                                    ↓
                        Only access explicitly granted functions
```

DruidUI encapsulates all execution fully. Only functions explicitly forwarded to the WASM target can be executed.

### Use Cases

Perfect for:

- **Custom Server Dashboards** - Players build their own UI for your game server
- **Plugin Marketplaces** - Third-party UIs without security risks
- **User-Generated Content** - Safe execution of community creations
- **Multi-tenant Platforms** - Isolated UIs per tenant/customer

## Quick Start

### Installation

Create a new DruidUI project:

```bash
npx -p druid-ui create-druid-ui my-dashboard
cd my-dashboard
npm install
npm run dev
```

This scaffolds:
- Pre-configured `tsconfig.json`
- Vite development server with hot reload
- Empty `src/index.tsx` entry point
- Build pipeline to WASM

### Your First Component

Create `src/index.tsx`:

```tsx
import { createComponent, Context } from 'druid-ui';

let clickCount = 0;

export const component = createComponent((ctx: Context) => {
  return (
    <main>
      <h1>Hello Druid!</h1>
      <p>Path: {ctx.path}</p>
      
      <button onClick={() => { clickCount++; }}>
        Click Me
      </button>
      
      <p>Clicks: {clickCount}</p>
    </main>
  );
});
```

### Build for Production

```bash
npm run build
# Output: dist/component.wasm
```

### Deploy to Druid

```bash
# Copy to your scroll's ui directory
cp dist/component.wasm scrolls/my-game/ui/dashboard.wasm

# Reference in scroll.yaml
ui:
  - name: dashboard
    path: ui/dashboard.wasm
    route: /admin
```

## Core Concepts

### Components

DruidUI uses a **functional component model** inspired by React and Mithril.js:

```tsx
const MyComponent = ({ title, count }: Props) => (
  <div>
    <h2>{title}</h2>
    <p>Count: {count}</p>
  </div>
);

export const component = createComponent((ctx: Context) => {
  return (
    <div>
      <MyComponent title="Hello" count={42} />
    </div>
  );
});
```

### Rendering Model

Unlike React's complex virtual DOM diffing, DruidUI is simpler:

**Every event listener execution triggers a full rerender.**

```tsx
let state = 0;

<button onClick={() => {
  state++;  // Rerender happens automatically
}}>
  Increment
</button>
```

This is less efficient than React but **much simpler** for multi-language support and reasoning about state.

### Context

Every component receives a `Context` object:

```tsx
interface Context {
  path: string;        // Current route path
  params: Record<string, string>;  // URL parameters
  // ... extension data
}
```

## Development Workflow

### Sandbox Mode (Production)

Components run in full WebAssembly sandbox:

```bash
npm run build           # Compile to WASM
npm run preview         # Test sandboxed version
```

**Pros:**
- ✅ Production-ready
- ✅ Secure
- ✅ Isolated

**Cons:**
- ❌ Slower build times
- ❌ Higher resource usage

### Raw Mode (Development)

Disable WASM for faster iteration:

```tsx
// In your HTML
<druid-ui no-sandbox src="./src/index.tsx"></druid-ui>
```

Or programmatically:

```tsx
druidElement.sandbox = false;
```

**Pros:**
- ✅ Instant hot reload
- ✅ Normal debugging tools
- ✅ Fast iteration

**Cons:**
- ❌ Not sandboxed
- ❌ Dev-only

### Vite Plugin

DruidUI includes a Vite plugin for both modes:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import druidUI from 'druid-ui/dev';

export default defineConfig({
  plugins: [druidUI()],
});
```

Features:
- Hot module replacement
- TypeScript support
- Automatic WASM builds
- Source maps

## Architecture

### Component Lifecycle

```
1. init() called → Returns root JSX node ID
           ↓
2. Node tree built via d() calls
           ↓
3. Snabbdom renders to Shadow DOM
           ↓
4. Event listener attached
           ↓
5. User interaction → emit() called
           ↓
6. Event handler runs
           ↓
7. rerender() → Back to step 1
```

### Host ↔ WASM Interface

**Host provides to WASM:**

```ts
d(element: string, props: object, children: string[]): string
// Creates DOM node, returns node ID

log(message: string)
// Console logging

rerender()
// Trigger full component rerender
```

**WASM provides to Host:**

```ts
init(): string
// Entry point, returns root node ID

emit(fnId: string, event: Event)
// Execute event listener

asyncCallback(fnId: string, value: string)
// Support async operations (temporary until WASI Preview 3)
```

### Shadow DOM Encapsulation

Each DruidUI component renders in a **Shadow DOM**:

```
<druid-ui>
  #shadow-root
    <style>/* Scoped styles */</style>
    <main>/* Your component */</main>
```

Benefits:
- ✅ Style isolation (no CSS leaks)
- ✅ Clean DOM tree
- ✅ Web Component standard

## Multi-Language Support

### Currently Supported

**JavaScript/TypeScript** ✅

- Full JSX/TSX support
- Wrapper functions for nice DX
- Type definitions included

### Coming Soon

**Rust** 🚧

```rust
// Future syntax (not yet available)
use druid_ui::*;

#[component]
fn MyComponent() -> Element {
    html! {
        <div>
            <h1>{"Hello from Rust!"}</h1>
        </div>
    }
}
```

**C/C++** 🚧

```cpp
// Future syntax (not yet available)
#include <druid-ui.h>

Element MyComponent() {
    return d("div", {}, {
        d("h1", {}, {"Hello from C++"})
    });
}
```

### Why Not Yet?

The WebAssembly Component Model is still maturing. Missing features:

- [Concurrency support](https://component-model.bytecodealliance.org/building-a-simple-component.html)
- [Client callbacks](https://github.com/WebAssembly/component-model/issues/223)
- [Recursive types](https://github.com/WebAssembly/component-model/issues/56)
- Async/await (WASI Preview 3)

We're waiting for these to stabilize before investing in multi-language SDKs.

## Extension System

By default, DruidUI only exports minimal functions for security. The **extension system** lets you add custom APIs safely.

### Creating Extensions

1. **Define WIT interface:**

```wit
// extensions.wit
package druid:ui;

interface extension {
  fetch-data: func(url: string) -> string;
  save-config: func(key: string, value: string);
}
```

2. **Implement in host:**

```js
druidElement.extensionObject = {
  "druid:ui/extension": {
    fetchData: async (url) => {
      const res = await fetch(url);
      return await res.text();
    },
    saveConfig: (key, value) => {
      localStorage.setItem(key, value);
    },
  },
};
```

3. **Use in component:**

```tsx
import { fetchData, saveConfig } from 'druid:ui/extension';

export const component = createComponent((ctx) => {
  const [data, setData] = useState('');
  
  const loadData = async () => {
    const result = await fetchData('/api/status');
    setData(result);
  };
  
  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <pre>{data}</pre>
    </div>
  );
});
```

### Async Extensions (Current Workaround)

Since WASI Preview 3 isn't ready, async functions need a workaround:

```js
// Host side
druidElement.extensionObject = {
  "druid:ui/extension": {
    asyncFetchData: (url, callbackId) => {
      fetch(url)
        .then(res => res.text())
        .then(data => {
          druidElement.asyncCallback(callbackId, data);
        });
    },
  },
};
```

```tsx
// Component side
import { asyncFetchData } from 'druid:ui/extension';

const loadData = () => {
  const callbackId = generateCallbackId();
  asyncFetchData('/api/status', callbackId);
  // Result arrives via asyncCallback
};
```

**Note:** This will be removed once WASI Preview 3 supports async natively.

## CLI Tools

DruidUI provides two helpful commands:

### Build Component

```bash
npx build-ui <file>
```

Compiles a TypeScript/JSX file to WebAssembly component.

### Generate Types

```bash
npx gen-types
```

Generates TypeScript definitions for your extension WIT files.

```bash
# Example workflow
echo "interface my-api { ... }" > extensions.wit
npx gen-types
# → types/extensions.d.ts created
```

## Performance

### Bundle Size

Typical DruidUI component:

- **Compiled WASM**: 50-200 KB
- **Runtime overhead**: ~10 KB (Snabbdom)
- **Total**: ~60-210 KB

Compare to:
- React SPA: 200-500 KB+ (before your code)
- Vue SPA: 100-300 KB+

### Execution Speed

- **Initial render**: ~5-20ms
- **Rerender**: ~2-10ms (full tree)
- **Event handling**: &lt;1ms

Fast enough for dashboards and UIs, not suitable for 60fps games.

### Memory

- **Idle**: ~2-5 MB per component
- **Active**: ~10-20 MB with large DOMs

WebAssembly adds ~2MB overhead vs native JS.

## Best Practices

### 1. Keep State Simple

```tsx
// ✅ Good: Simple state
let count = 0;
let items = ['a', 'b', 'c'];

// ❌ Avoid: Complex nested objects
let state = { user: { profile: { settings: { ... } } } };
```

### 2. Minimize Rerenders

Remember: every event triggers full rerender.

```tsx
// ✅ Good: Debounce expensive operations
let search Query = '';
<input onChange={debounce((e) => {
  searchQuery = e.target.value;
}, 300)} />

// ❌ Avoid: Real-time without debounce
<input onChange={(e) => {
  performExpensiveSearch(e.target.value);
}} />
```

### 3. Use Extensions Wisely

```tsx
// ✅ Good: Expose specific APIs
interface Extension {
  fetchServerStatus(): Promise<Status>;
  restartServer(): Promise<void>;
}

// ❌ Avoid: Generic eval-like APIs
interface BadExtension {
  runCode(code: string): any;  // Defeats sandboxing!
}
```

### 4. Test in Sandbox Mode

```bash
# Always test production build
npm run build
npm run preview

# Don't ship only-tested in raw mode
```

## Examples

DruidUI includes several example projects:

### [Simple Example](https://github.com/highcard-dev/druid-ui/tree/main/examples/simple)
Basic component with sandbox mode + hot reload.

### [Simple Extended](https://github.com/highcard-dev/druid-ui/tree/main/examples/simple-extended)
Component with custom extension APIs.

### [No-Sandbox Development](https://github.com/highcard-dev/druid-ui/tree/main/examples/simple-no-sandbox)
Fast iteration without WASM overhead.

### [Extended No-Sandbox](https://github.com/highcard-dev/druid-ui/tree/main/examples/simple-extended-no-sandbox)
Extensions in raw development mode.

## Limitations

### Current Limitations

1. **No Async/Await** - Workaround required until WASI Preview 3
2. **Full Rerenders** - Not as efficient as React's diffing
3. **JavaScript Only** - Rust/C++ support pending Component Model maturity
4. **No Concurrent Rendering** - Single-threaded execution
5. **Limited Browser APIs** - Only what's explicitly exposed

### Future Improvements

Planned once WebAssembly standards mature:

- Native async/await support
- Rust/C++ SDKs
- Concurrent rendering
- Streaming SSR
- Better debugging tools

## Migration Guide

### From React

```tsx
// React
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

// DruidUI
import { createComponent } from 'druid-ui';

let count = 0;

export const component = createComponent(() => {
  return (
    <button onClick={() => { count++; }}>
      {count}
    </button>
  );
});
```

Key differences:
- No `useState` - just use module-level variables
- Auto-rerender on events
- Export `component`, not function

### From Vue

```vue
<!-- Vue -->
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
export default {
  data() {
    return { count: 0 };
  }
};
</script>
```

```tsx
// DruidUI
import { createComponent } from 'druid-ui';

let count = 0;

export const component = createComponent(() => {
  return (
    <button onClick={() => { count++; }}>
      {count}
    </button>
  );
});
```

## Next Steps

- [Examples Repository](https://github.com/highcard-dev/druid-ui/tree/main/examples)
- [DruidUI Source Code](https://github.com/highcard-dev/druid-ui)
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)

## FAQ

**Q: Why not just use iframes?**  
A: iframes can't share state efficiently with the host and have limited styling options. WASM provides true sandboxing with full programmatic control.

**Q: Can I use npm packages?**  
A: Yes, but they must be compatible with WebAssembly. Pure JS libraries work fine. Browser APIs need extensions.

**Q: How do I debug WASM components?**  
A: Use raw mode (`no-sandbox`) during development with normal browser dev tools. Test in sandbox mode before production.

**Q: Can I style components?**  
A: Yes! Use inline styles, `<style>` tags, or CSS-in-JS. Styles are scoped to the Shadow DOM.

**Q: What about SSR?**  
A: Not currently supported. DruidUI is client-side only. SSR may come in future versions.
