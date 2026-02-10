---
sidebar_position: 6
title: "@druid-ui/host"
description: Browser runtime for executing DruidUI WebAssembly components
---

# @druid-ui/host

Browser-side runtime that loads and executes DruidUI WebAssembly components. Provides the custom `<druid-ui>` element, WASM instantiation, and DOM rendering via Snabbdom.

## Installation

```bash
npm install @druid-ui/host
```

**Note:** Usually installed automatically via `create-druid-ui`. You don't typically import this directly.

## Architecture

```
Browser
  ↓
<druid-ui> Custom Element
  ↓
@druid-ui/host
  ├── WASM Loader (jco)
  ├── Snabbdom (Virtual DOM)
  └── Shadow DOM
      └── Rendered Component
```

## Custom Element API

### `<druid-ui>` Element

The main interface for DruidUI components:

```html
<druid-ui 
  src="/component.wasm"
  no-sandbox
  path="/dashboard"
></druid-ui>
```

**Attributes:**

- `src` - URL to WASM component or TypeScript file
- `no-sandbox` - Disable WASM, run raw JavaScript (dev only)
- `path` - Route path passed to component context
- `params` - URL params as JSON string

### JavaScript API

```typescript
interface DruidUIElement extends HTMLElement {
  // Toggle sandbox mode
  sandbox: boolean;
  
  // Provide extension APIs
  extensionObject: Record<string, any>;
  
  // Manually trigger rerender
  rerender(): void;
  
  // Load component programmatically
  load(url: string): Promise<void>;
}
```

**Example:**

```typescript
const element = document.querySelector('druid-ui') as DruidUIElement;

// Disable sandbox (development)
element.sandbox = false;

// Provide custom APIs
element.extensionObject = {
  'druid:ui/extension': {
    fetchData: async (url: string) => {
      const res = await fetch(url);
      return res.json();
    },
    saveData: (key: string, value: string) => {
      localStorage.setItem(key, value);
    }
  }
};

// Force rerender
element.rerender();
```

## Extension System

### Providing Extension Functions

Extensions are provided via `extensionObject`:

```typescript
element.extensionObject = {
  // Package name from WIT
  'my:api/fetch': {
    // Function name from WIT
    fetchData: async (url: string) => {
      return await fetch(url).then(r => r.text());
    }
  },
  
  'my:api/storage': {
    save: (key: string, val: string) => {
      localStorage.setItem(key, val);
    },
    load: (key: string) => {
      return localStorage.getItem(key) || '';
    }
  }
};
```

### Async Function Workaround

Until WASI Preview 3, async requires a callback pattern:

```typescript
element.extensionObject = {
  'my:api/async': {
    fetchDataAsync: (url: string, callbackId: string) => {
      fetch(url)
        .then(r => r.text())
        .then(data => {
          // Call back into WASM
          element.asyncCallback(callbackId, data);
        });
    }
  }
};
```

## Shadow DOM

Components render in isolated Shadow DOM:

```html
<druid-ui src="/component.wasm">
  #shadow-root
    <style>/* Scoped styles */</style>
    <main>
      <h1>Component content</h1>
    </main>
</druid-ui>
```

**Benefits:**
- Style isolation
- Clean DOM structure
- Web Component standards

## Context Passing

Pass data to components via attributes:

```html
<druid-ui
  src="/component.wasm"
  path="/dashboard/settings"
  params='{"userId": "123"}'
></druid-ui>
```

Component receives:

```typescript
export const component = createComponent((ctx) => {
  console.log(ctx.path);    // "/dashboard/settings"
  console.log(ctx.params);  // { userId: "123" }
  
  return <div>User: {ctx.params.userId}</div>;
});
```

## Performance

### WASM Loading

First load:
- Download WASM file
- Instantiate component
- Initialize guest code
- **Total:** ~50-200ms

Subsequent renders:
- Guest code already loaded
- Only rerender needed
- **Total:** ~2-10ms

### Memory Usage

- **WASM instance:** ~2-5 MB
- **Virtual DOM:** ~1-3 MB
- **Shadow DOM:** Varies by component
- **Total:** ~5-15 MB per component

### Optimization Tips

1. **Minimize component size:**
   ```bash
   druid-ui-build src/index.tsx --minify
   ```

2. **Avoid large dependencies:**
   ```typescript
   // ❌ Bad: Pulls in entire library
   import _ from 'lodash';
   
   // ✅ Good: Only import what you need
   import { map, filter } from 'lodash';
   ```

3. **Cache WASM files:**
   ```html
   <link rel="preload" href="/component.wasm" as="fetch" crossorigin>
   ```

## Development vs Production

### Development (Raw Mode)

```html
<druid-ui src="/src/index.tsx" no-sandbox></druid-ui>
```

- Loads TypeScript directly
- Hot module replacement
- Fast iteration
- Not sandboxed

### Production (WASM Mode)

```html
<druid-ui src="/component.wasm"></druid-ui>
```

- Loads compiled WASM
- Full sandboxing
- Production-ready
- Optimized

## Security

### Sandbox Guarantees

In WASM mode, components cannot:
- ❌ Access the DOM directly
- ❌ Call arbitrary browser APIs
- ❌ Make network requests (unless explicitly provided)
- ❌ Access localStorage/cookies (unless explicitly provided)
- ❌ Execute eval() or new Function()

They can only:
- ✅ Return JSX via `d()` function
- ✅ Call provided extension functions
- ✅ Call `log()` and `rerender()`

### Extension Security

Be careful what you expose:

```typescript
// ❌ Dangerous: Gives component full DOM access
element.extensionObject = {
  'unsafe:api': {
    eval: (code: string) => eval(code),
    executeJS: (code: string) => new Function(code)()
  }
};

// ✅ Safe: Exposes specific, controlled APIs
element.extensionObject = {
  'safe:api': {
    fetchUserData: async (userId: string) => {
      // Validate input
      if (!/^\d+$/.test(userId)) throw new Error('Invalid userId');
      
      // Controlled fetch
      return await fetch(`/api/users/${userId}`)
        .then(r => r.json());
    }
  }
};
```

## Programmatic Usage

### Imperative API

```typescript
import { DruidUIElement } from '@druid-ui/host';

// Create element
const ui = document.createElement('druid-ui') as DruidUIElement;

// Configure
ui.sandbox = true;
ui.extensionObject = { /* ... */ };

// Load component
await ui.load('/component.wasm');

// Mount
document.body.appendChild(ui);

// Update context
ui.setAttribute('path', '/new-path');
ui.setAttribute('params', JSON.stringify({ page: 2 }));

// Rerender
ui.rerender();
```

## Debugging

### Console Logging

Components can log to browser console:

```typescript
// In component
export const component = createComponent((ctx) => {
  console.log('Component rendered with', ctx);
  return <div>Content</div>;
});
```

Logs appear in browser DevTools console.

### Inspection

Access the component instance:

```typescript
const element = document.querySelector('druid-ui') as DruidUIElement;

// Check if loaded
console.log(element.sandbox);  // true/false

// Inspect extensions
console.log(element.extensionObject);

// Force rerender
element.rerender();
```

## Troubleshooting

### Component doesn't load

Check browser console for errors. Common issues:

1. **WASM file not found:** Verify `src` path
2. **CORS issues:** Serve WASM with correct headers
3. **Invalid WASM:** Rebuild with `druid-ui-build`

### Extensions not working

Ensure WIT package names match:

```wit
// wit/extensions.wit
package my:api;  // Must match exactly
```

```typescript
element.extensionObject = {
  'my:api/fetch': { /* ... */ }  // Package name here
};
```

### Memory leaks

Remove elements properly:

```typescript
const element = document.querySelector('druid-ui');
element?.remove();  // Cleans up WASM instance
```

## See Also

- [@druid-ui/component](./component.md) - Component API
- [@druid-ui/build](./build.md) - Build tools
- [@druid-ui/vite](./vite.md) - Development server
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)
- [Snabbdom](https://github.com/snabbdom/snabbdom)
