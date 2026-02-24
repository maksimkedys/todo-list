# Todo List

A drag-and-drop kanban-style todo list built with React, TypeScript, and Tailwind CSS. No UI component libraries — custom components and [@atlaskit/pragmatic-drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/) for DnD.

## Features

- **Tasks**: Add, edit, delete, mark complete/incomplete. Reorder within a column or move across columns via drag-and-drop.
- **Columns**: Add, delete, rename, reorder via drag-and-drop.
- **Multi-select**: Select tasks per column (“Select all” in header) or individually. Bulk actions: delete, mark complete/incomplete, move to another column.
- **Search**: Fuzzy search by task name. Matches exact substrings, subsequences (e.g. `tdo` → “To Do”), and typo-tolerant word matches (e.g. `taks` → “task”). Matching text is highlighted in results.
- **Filter**: Show All, Incomplete only, or Completed only. Completed tasks are visually distinct (dimmed + strikethrough).
- **Persistence**: Board state (columns + tasks) is stored in `localStorage` and restored on refresh.
- **Responsive**: Layout adapts for desktop and mobile (Tailwind breakpoints).

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
src/
├── App.tsx                 # Root shell: Toolbar + Board + sprite loader
├── main.tsx                # Entry point, wraps app in AppProvider
├── index.css               # Global styles + Tailwind
├── types/
│   └── index.ts            # TaskType, ColumnType, enums (ButtonVariant, IconName, etc.)
├── context/
│   ├── AppContext.tsx      # React context type (AppContextValue)
│   └── AppProvider.tsx     # State + all column/task actions, localStorage sync
├── hooks/
│   ├── useAppContext.ts    # useContext(AppContext) with throw-if-missing
│   ├── useLocalStorage.ts  # getValue / saveValue for JSON in localStorage
│   ├── useInlineEdit.ts    # Inline-edit state (focus, Enter/Escape, save/cancel)
│   └── useInlineForm.ts    # Inline add-form state (open/close, validate, transform)
├── utils/
│   ├── id.ts               # generateId() for unique IDs
│   ├── fuzzySearch.ts      # fuzzyMatch() — exact, subsequence, Levenshtein word match
│   └── highlight.ts       # getHighlightParts() for search highlighting (uses fuzzyMatch)
└── components/
    ├── Board/              # Grid of DraggableColumn items
    ├── Toolbar/            # Search, filter buttons, Add column, bulk-action bar
    ├── DraggableColumn/    # Column wrapped with pragmatic-drag-and-drop (column reorder)
    ├── Column/             # Header (title, select-all, edit/delete), task list, Add task
    ├── DraggableTask/      # Task wrapped with pragmatic-drag-and-drop (task move/reorder)
    ├── Task/               # Checkboxes (select, complete), text, edit/delete, highlight
    ├── Search/             # Search input with icon
    ├── InlineForm/         # Text input + Add/Cancel (tasks, columns)
    ├── Button/             # Styled button (variants from types)
    ├── BaseInput/          # Text input with variant styling
    └── Icon/               # SVG icon from sprite; SpriteLoader defines symbols
```

## Architecture

- **State**: Single source of truth in `AppProvider`: `columns`, `searchQuery`, `taskFilter`, `selectedTaskIds`. All mutations go through provider methods and persist columns to `localStorage` via `useLocalStorage`.
- **Drag-and-drop**: `DraggableColumn` and `DraggableTask` use pragmatic-drag-and-drop’s `draggable` and `dropTargetForElements`. On drop, they call `reorderColumns` or `moveTask` from context.
- **Search**: Toolbar sets `searchQuery`; each `Column` filters its tasks with `fuzzyMatch()` from `utils/fuzzySearch`. `Task` renders text via `getHighlightParts()` so exact and fuzzy matches are highlighted.

### Fuzzy search (utils/fuzzySearch.ts)

Three-stage matching (first successful result wins):

1. **Exact substring** — case-insensitive `indexOf`; highest score (1000+).
2. **Subsequence** — every query character appears in order in the text; score 100+ with bonuses for consecutive runs and word boundaries.
3. **Word similarity** — query and text are split into words; each query word is matched against text words using Levenshtein distance; pairs with similarity ≥ 60% count as matches; score 10+.

`fuzzyMatch(text, query)` returns `null` or `{ score, matchedIndices }`. `matchedIndices` is used by `highlight.ts` to split task text into plain and highlighted segments.

## Configuration

### Tailwind

Custom palette (primary, surface), spacing, soft shadows, and animations in `tailwind.config.js`.

### Prettier

No semicolons, single quotes, trailing commas, 100-char line width. Tailwind class sorting via `prettier-plugin-tailwindcss`.

### ESLint

TypeScript, React Hooks, React Refresh, and Prettier integration.
