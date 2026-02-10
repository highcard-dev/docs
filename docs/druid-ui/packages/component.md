---
sidebar_position: 2
title: "@druid-ui/component"
description: Component runtime library for building DruidUI components
---

# @druid-ui/component

The core runtime library for building DruidUI components. Provides the component API, JSX/TSX support, and utilities for creating reactive UIs.

## Installation

```bash
npm install @druid-ui/component
```

## Package Exports

### Main Export (`@druid-ui/component`)

```typescript
import { createComponent, Context } from '@druid-ui/component';
```

Used for building sandboxed WASM components.

### Raw Export (`@druid-ui/component/raw`)

```typescript
import { createComponent } from '@druid-ui/component/raw';
```

Used for development without WASM sandbox (raw mode).

### JSX Types (`@druid-ui/component/jsx`)

```typescript
/// <reference types="@druid-ui/component/jsx" />
```

TypeScript JSX type definitions for DruidUI elements.

### Type Definitions (`@druid-ui/component/types`)

```typescript
import type { DruidUITypes } from '@druid-ui/component/types';
```

Generated TypeScript types from WIT definitions.

## API Reference

### `createComponent()`

Creates a DruidUI component from a render function.

```typescript
function createComponent(
  renderFn: (ctx: Context) => JSX.Element
): Component;
```

**Parameters:**
- `renderFn` - Function that returns JSX. Called on every render.

**Returns:** Component object ready for export.

**Example:**

```typescript
import { createComponent, Context } from '@druid-ui/component';

let count = 0;

export const component = createComponent((ctx: Context) => {
  return (
    <main>
      <h1>Counter: {count}</h1>
      <button onClick={() => { count++; }}>
        Increment
      </button>
    </main>
  );
});
```

### Context Object

The `Context` object passed to your component contains:

```typescript
interface Context {
  path: string;                     // Current route path
  params: Record<string, string>;   // URL parameters
  // ... extension data from host
}
```

### Event Handlers

All standard DOM events are supported:

```typescript
<button onClick={(e) => { /* handler */ }}>Click</button>
<input onInput={(e) => { /* handler */ }} />
<form onSubmit={(e) => { /* handler */ }}>...</form>
```

**Note:** Every event handler execution triggers a full component rerender.

### JSX Elements

DruidUI supports all standard HTML elements:

```tsx
// Basic elements
<div className="container">
  <h1>Title</h1>
  <p>Text</p>
  <button>Click</button>
</div>

// Inputs
<input type="text" value={value} onInput={handler} />
<textarea value={text} />
<select value={selected}>
  <option value="a">Option A</option>
</select>

// Attributes
<div id="main" className="active" style="color: red">
  Content
</div>

// Data attributes
<div data-id={id} data-name={name}>
  Custom data
</div>
```

### Component Composition

Create reusable components:

```typescript
const Button = ({ label, onClick }: ButtonProps) => (
  <button onClick={onClick} className="btn">
    {label}
  </button>
);

const Counter = ({ initial = 0 }: CounterProps) => {
  let count = initial;
  
  return (
    <div>
      <span>Count: {count}</span>
      <Button label="+" onClick={() => { count++; }} />
      <Button label="-" onClick={() => { count--; }} />
    </div>
  );
};

export const component = createComponent((ctx) => {
  return <Counter initial={10} />;
});
```

## Raw Mode

For development without WASM overhead:

```typescript
import { createComponent } from '@druid-ui/component/raw';

// Same API, but runs directly in JavaScript
export const component = createComponent((ctx) => {
  return <div>Development mode</div>;
});
```

**Differences:**
- No WASM compilation needed
- Faster hot reload
- Normal browser debugging
- **Not sandboxed** - dev only!

## State Management

DruidUI uses **module-level state** instead of hooks:

```typescript
// Module-level variables persist across renders
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

**No useState, no useEffect** - just JavaScript variables.

## TypeScript Configuration

Enable JSX support in `tsconfig.json`:

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

## Best Practices

### 1. Keep state flat

```typescript
// ✅ Good
let name = '';
let age = 0;

// ❌ Avoid deep nesting
let user = { profile: { data: { name: '', age: 0 } } };
```

### 2. Avoid expensive operations in render

```typescript
// ❌ Bad: expensive calculation every render
export const component = createComponent(() => {
  const result = expensiveCalculation(); // Runs every time!
  return <div>{result}</div>;
});

// ✅ Good: compute on demand
let cachedResult: string | null = null;

export const component = createComponent(() => {
  return (
    <div>
      <button onClick={() => {
        cachedResult = expensiveCalculation();
      }}>
        Calculate
      </button>
      {cachedResult && <div>{cachedResult}</div>}
    </div>
  );
});
```

### 3. Use conditional rendering

```typescript
const UserProfile = ({ user }: Props) => {
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
};
```

## Examples

### Todo List

```typescript
import { createComponent } from '@druid-ui/component';

let todos: Array<{ id: number; text: string; done: boolean }> = [];
let nextId = 1;
let input = '';

export const component = createComponent(() => {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      
      <div className="input-area">
        <input
          type="text"
          value={input}
          onInput={(e) => { input = e.target.value; }}
          placeholder="What needs to be done?"
        />
        <button onClick={() => {
          if (input.trim()) {
            todos.push({ id: nextId++, text: input, done: false });
            input = '';
          }
        }}>
          Add
        </button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                todo.done = !todo.done;
              }}
            />
            <span>{todo.text}</span>
            <button onClick={() => {
              todos = todos.filter(t => t.id !== todo.id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      <div className="stats">
        Total: {todos.length} | 
        Done: {todos.filter(t => t.done).length}
      </div>
    </div>
  );
});
```

### Form Handling

```typescript
import { createComponent } from '@druid-ui/component';

let form = {
  name: '',
  email: '',
  message: ''
};

let submitted = false;

export const component = createComponent(() => {
  return (
    <div>
      {submitted ? (
        <div className="success">
          <h2>Thank you, {form.name}!</h2>
          <p>We'll contact you at {form.email}</p>
          <button onClick={() => {
            submitted = false;
            form = { name: '', email: '', message: '' };
          }}>
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          submitted = true;
        }}>
          <input
            type="text"
            value={form.name}
            onInput={(e) => { form.name = e.target.value; }}
            placeholder="Name"
            required
          />
          
          <input
            type="email"
            value={form.email}
            onInput={(e) => { form.email = e.target.value; }}
            placeholder="Email"
            required
          />
          
          <textarea
            value={form.message}
            onInput={(e) => { form.message = e.target.value; }}
            placeholder="Message"
            required
          />
          
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
});
```

## Troubleshooting

### JSX not working

Ensure your `tsconfig.json` has proper JSX configuration:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "d",
    "jsxFragmentFactory": "Fragment"
  }
}
```

### Types not found

Add types reference in your entry file:

```typescript
/// <reference types="@druid-ui/component/jsx" />
```

### Event handlers not firing

Events auto-rerender after execution. If state doesn't update, check that you're modifying module-level variables, not local copies.

## See Also

- [@druid-ui/build](./build.md) - Build and compile components
- [@druid-ui/vite](./vite.md) - Vite plugin for development
- [@druid-ui/host](./host.md) - Browser runtime
- [create-druid-ui](./create-druid-ui.md) - Project scaffolding
