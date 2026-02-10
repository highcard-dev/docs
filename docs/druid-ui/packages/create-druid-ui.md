---
sidebar_position: 4
title: "create-druid-ui"
description: Project scaffolding tool for creating new DruidUI applications
---

# create-druid-ui

Project scaffolding tool that creates a new DruidUI application with all necessary configuration, dependencies, and boilerplate.

## Installation

**Note:** You don't need to install this package. Use `npx` to run it directly:

```bash
npx create-druid-ui my-app
```

## Usage

### Create New Project

```bash
npx create-druid-ui <project-name> [options]
```

**Arguments:**
- `<project-name>` - Name of your project directory

**Options:**
- `--template <name>` - Template to use (default: `starter`)
- `--npm` - Use npm instead of default package manager
- `--yarn` - Use yarn instead of default package manager
- `--pnpm` - Use pnpm instead of default package manager

**Examples:**

```bash
# Basic project
npx create-druid-ui my-dashboard

# With specific template
npx create-druid-ui my-app --template simple

# With yarn
npx create-druid-ui my-app --yarn
```

## Generated Project Structure

```
my-app/
├── src/
│   └── index.tsx          # Entry point
├── public/
│   └── index.html         # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── README.md              # Project readme
```

## Templates

### `starter` (default)

Basic DruidUI application with:
- TypeScript + JSX setup
- Vite dev server
- Hot module replacement
- Example component
- Build scripts

### `simple`

Minimal setup for learning:
- Single component
- No styling
- Commented examples

### `extended`

Advanced setup with extensions:
- Custom WIT interfaces
- Extension examples
- API integration patterns

## What's Included

### Package Dependencies

```json
{
  "dependencies": {
    "@druid-ui/component": "^2.0.0",
    "@druid-ui/host": "^2.0.0"
  },
  "devDependencies": {
    "@druid-ui/build": "^2.0.0",
    "@druid-ui/vite": "^2.0.0",
    "typescript": "~5.8.0",
    "vite": "^7.0.0"
  }
}
```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "druid-ui-build src/index.tsx",
    "preview": "vite preview",
    "gen-types": "druid-ui-gen-types druid-ui"
  }
}
```

### Configuration Files

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "jsx": "react",
    "jsxFactory": "d",
    "types": ["@druid-ui/component/jsx"]
  }
}
```

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import druidUI from '@druid-ui/vite';

export default defineConfig({
  plugins: [druidUI()]
});
```

## Example Component

Generated `src/index.tsx`:

```typescript
import { createComponent, Context } from '@druid-ui/component';

let count = 0;

export const component = createComponent((ctx: Context) => {
  return (
    <main>
      <h1>Hello DruidUI!</h1>
      <p>Path: {ctx.path}</p>
      
      <button onClick={() => { count++; }}>
        Clicked {count} times
      </button>
    </main>
  );
});
```

## Development Workflow

After creating a project:

```bash
cd my-app

# Install dependencies (if not auto-installed)
npm install

# Start dev server
npm run dev
# → Opens http://localhost:5173

# Build for production
npm run build
# → Outputs dist/component.wasm

# Preview production build
npm run preview
```

## Customization

### Adding Extensions

1. Create `wit/` directory:
```bash
mkdir wit
```

2. Define your API:
```wit
// wit/extensions.wit
package my:api;

interface my-api {
  fetch-data: func(url: string) -> string;
}

world my-component {
  import my-api;
}
```

3. Generate types:
```bash
npm run gen-types
```

4. Use in component:
```typescript
import { fetchData } from 'my:api/my-api';

export const component = createComponent(async (ctx) => {
  const data = await fetchData('/api/data');
  return <div>{data}</div>;
});
```

### Styling

Add CSS in `src/styles.css`:

```css
:host {
  display: block;
  font-family: system-ui;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #3b82f6;
  color: white;
}
```

Import in component:

```typescript
import './styles.css';
```

## Deployment

### Build for Production

```bash
npm run build
```

Outputs `dist/component.wasm` ready for deployment.

### Deploy to Druid

```bash
# Copy to your scroll
cp dist/component.wasm path/to/scroll/ui/dashboard.wasm

# Reference in scroll.yaml
ui:
  - name: dashboard
    path: ui/dashboard.wasm
    route: /admin
```

## Troubleshooting

### npx fails with "command not found"

Update Node.js and npm:

```bash
npm install -g npm@latest
node --version  # Should be >= 18.0.0
```

### Template not found

Use default template:

```bash
npx create-druid-ui my-app
# Don't specify --template
```

### Port already in use

Change Vite port in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [druidUI()]
});
```

## See Also

- [@druid-ui/component](./component.md) - Component API
- [@druid-ui/build](./build.md) - Build tools
- [@druid-ui/vite](./vite.md) - Vite plugin
- [DruidUI Examples](https://github.com/highcard-dev/druid-ui/tree/main/examples)
