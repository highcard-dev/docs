---
sidebar_position: 6
title: "@druid-ui/host"
description: Browser runtime for WASM
---

# @druid-ui/host

Browser-side runtime that loads and executes DruidUI WebAssembly components.

## Installation

```bash
npm install @druid-ui/host
```

**Note:** Usually installed automatically. You don't typically import this directly.

## Custom Element

### `<druid-ui>`

```html
<druid-ui 
  src="/component.wasm"
  no-sandbox
  path="/dashboard"
  params='{"userId":"123"}'
></druid-ui>
```

**Attributes:**
- `src` - URL to WASM or TypeScript file
- `no-sandbox` - Disable WASM (dev only)
- `path` - Route path
- `params` - URL params (JSON string)

### JavaScript API

```typescript
interface DruidUIElement extends HTMLElement {
  sandbox: boolean;                     // Toggle sandbox
  extensionObject: Record<string, any>; // Extension APIs
  rerender(): void;                     // Manual rerender
  load(url: string): Promise<void>;     // Load component
}
```

**Example:**

```typescript
const el = document.querySelector('druid-ui') as DruidUIElement;

// Disable sandbox
el.sandbox = false;

// Provide extensions
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

## Extensions

Provide custom APIs:

```typescript
el.extensionObject = {
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

## Shadow DOM

Components render in isolated Shadow DOM:

```html
<druid-ui>
  #shadow-root
    <style>/* Scoped */</style>
    <main>/* Component */</main>
</druid-ui>
```

## Security

In WASM mode, components **cannot**:
- Access DOM directly
- Call browser APIs (unless provided)
- Execute eval() or new Function()

They can only:
- Return JSX via `d()`
- Call provided extension functions
- Call `log()` and `rerender()`

## See Also

- [@druid-ui/component](./component.md)
- [@druid-ui/vite](./vite.md)
- [WebAssembly Component Model](https://component-model.bytecodealliance.org/)
