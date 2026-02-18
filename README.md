# Todo List

A drag-and-drop todo list built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for dev server and bundling
- **Tailwind CSS 4** with PostCSS
- **@atlaskit/pragmatic-drag-and-drop** for drag-and-drop
- **ESLint** + **Prettier** for code quality

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start development server            |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview production build            |
| `npm run lint`         | Check for lint errors               |
| `npm run lint:fix`     | Auto-fix lint errors                |
| `npm run format`       | Format source files with Prettier   |
| `npm run format:check` | Check formatting without writing    |

## Project Structure

```
todo-list/
├── src/
│   ├── App.tsx          # Main app with drag-and-drop
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + Tailwind imports
├── tailwind.config.js   # Tailwind theme (indigo palette, animations)
├── postcss.config.js    # PostCSS with @tailwindcss/postcss
├── eslint.config.js     # ESLint + Prettier integration
├── .prettierrc.json     # Prettier config + Tailwind class sorting
└── index.html
```

## Configuration

### Tailwind

Custom indigo color palette, extended spacing, soft shadows, and animations (`fade-in`, `slide-up`, `slide-down`, `spin-slow`) defined in `tailwind.config.js`.

### Prettier

No semicolons, single quotes, trailing commas, 100-char line width. Tailwind class auto-sorting via `prettier-plugin-tailwindcss`.

### ESLint

TypeScript-aware rules, React Hooks checks, React Refresh support, and Prettier integration.
