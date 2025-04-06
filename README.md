# Project 01 – Vite + React + TypeScript + TailwindCSS + Shadcn UI

## This project is a starter template using **Vite**, **React**, **TypeScript**, **TailwindCSS**, and **Shadcn UI**. Follow the steps below to get your development environment ready.

---

## 🛠️ Project Setup

### 1. Create the project

```bash
mkdir react-router
cd react-router
npm create vite
# Select "React"
# Name the project: project-01
cd project-01
npm install
```

---

## 🎨 Install TailwindCSS

Install Tailwind and the necessary Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite --legacy-peer-deps
```

### Update `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

### Add Tailwind to `index.css`

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";
```

### Verify Tailwind is working

Replace the contents of `App.tsx` with the following:

```tsx
function App() {
  return (
    <>
      <h1 className="text-3xl underline font-bold">Hello world</h1>
    </>
  )
}

export default App
```

> 💡 If styles don’t appear, stop the dev server and restart it:
```bash
npm run dev
```

You can now delete `App.css` and remove its import from `App.tsx`.

---

## ⚙️ Configure TypeScript Aliases

Update your `tsconfig.json` to include the following:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🔌 Update Vite Config for Aliases and React

Install required packages:

```bash
npm install -D @types/node --legacy-peer-deps
```

Update `vite.config.ts`:

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

## 💻 Initialize Shadcn UI

```bash
npx shadcn@latest init
```

### ❌ Common Error During Initialization

You might encounter this error:

```
npm ERR! peer vite@"^5.2.0 || ^6" from @tailwindcss/vite@4.1.3
```

This means your current Vite version (e.g. 4.5.12) is incompatible with the plugin.

### ✅ Solution: Upgrade Vite

1. Upgrade Vite to the latest version:

```bash
npm install vite@latest
```

2. If a `components.json` file was created during the failed init, **delete it**.

3. Re-run the initialization:

```bash
npx shadcn@latest init
```

Now you should be able to use the Shadcn CLI.

---

## ➕ Add Your First Shadcn Component

```bash
npx shadcn@latest add button
```

---

## ✅ Done!

Your project is now ready with:
- Vite + React + TypeScript
- TailwindCSS
- Shadcn UI Components
- Path aliases via `@/`

Happy coding! 🎉
```