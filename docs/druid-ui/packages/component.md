---
sidebar_position: 2
title: "@druid-ui/component"
description: Component runtime library
---

# @druid-ui/component

Core runtime for building DruidUI components.

## Installation

```bash
npm install @druid-ui/component
```

## Exports

| Export | Usage |
|--------|-------|
| `@druid-ui/component` | Main (WASM sandbox) |
| `@druid-ui/component/raw` | Raw mode (dev) |
| `@druid-ui/component/jsx` | JSX types |
| `@druid-ui/component/types` | WIT types |

## API

### `createComponent()`

```typescript
function createComponent(
  renderFn: (ctx: Context) => JSX.Element
): Component;
```

Creates a component from render function.

```tsx
import { createComponent } from '@druid-ui/component';

let count = 0;

export const component = createComponent((ctx) => {
  return (
    <button onClick={() => { count++; }}>
      Count: {count}
    </button>
  );
});
```

### Context

```typescript
interface Context {
  path: string;                     // Current route
  params: Record<string, string>;   // URL params
}
```

### Events

All standard DOM events supported:

```tsx
<button onClick={(e) => { /* handler */ }}>Click</button>
<input onInput={(e) => { /* handler */ }} />
<form onSubmit={(e) => { /* handler */ }}>...</form>
```

Every event execution triggers full rerender.

### State

Use module-level variables (no hooks):

```tsx
let todos: string[] = [];
let input = '';

export const component = createComponent(() => {
  return (
    <div>
      <input 
        value={input}
        onInput={(e) => { input = e.target.value; }}
      />
      <button onClick={() => {
        todos.push(input);
        input = '';
      }}>
        Add
      </button>
      
      <ul>
        {todos.map(todo => <li>{todo}</li>)}
      </ul>
    </div>
  );
});
```

### TypeScript

Enable JSX in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "d",
    "jsxFragmentFactory": "Fragment",
    "types": ["@druid-ui/component/jsx"]
  }
}
```

## See Also

- [@druid-ui/build](./build.md) - Build tools
- [@druid-ui/vite](./vite.md) - Dev server
- [@druid-ui/host](./host.md) - Browser runtime
