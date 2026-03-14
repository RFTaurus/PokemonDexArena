# AGENTS.md - PokemonDexArena Developer Guide

## Project Overview

- Project: PokemonDexArena
- App type: Vue 3 SPA built with Vite
- Language: JavaScript (no TypeScript currently)
- Main libraries: Vue 3, Vue Router 4, Axios, Remix Icon

## Required Documentation Rule

- Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

## Repository Rule Files

- `.cursorrules`: not found
- `.cursor/rules/`: not found
- `.github/copilot-instructions.md`: not found
- If these files are added, follow them as higher-priority repository instructions and update this guide.

## Build/Lint/Test Commands

### Core Commands

| Purpose          | Command           | Notes                                 |
| ---------------- | ----------------- | ------------------------------------- |
| Install deps     | `npm install`     | Run after clone or dependency changes |
| Dev server       | `npm run dev`     | Vite with hot reload                  |
| Production build | `npm run build`   | Outputs to `dist/`                    |
| Build preview    | `npm run preview` | Runs preview server on `4173`         |
| Lint all         | `npm run lint`    | ESLint with `--fix`                   |

### Lint Specific Targets

| Scope        | Command                                           |
| ------------ | ------------------------------------------------- |
| Single file  | `npx eslint src/components/PokemonCard.vue --fix` |
| Views folder | `npx eslint src/views --ext .vue,.js --fix`       |

### Test Status (Important)

- No test runner is configured in `package.json`.
- No `npm test` or `npm run test` script exists.
- Running a single test is currently not possible.
- If a test framework is introduced, document both:
  - project-wide test command
  - single-test invocation command

## Code Style Guidelines

### JavaScript and Vue

- Use Vue 3 Composition API and `<script setup>`.
- Use ES modules (`import`/`export`).
- Use 2 spaces for indentation.
- Use double quotes.
- Use semicolons.
- Use trailing commas for multiline arrays/objects.
- Keep component logic cohesive; avoid unnecessary abstraction in this small codebase.

### Import Conventions

Use this order in each file:

1. Vue imports (`vue`, `vue-router`)
2. Third-party packages (`axios`, `remixicon`)
3. Internal alias imports from `@/`
4. Relative imports (`../`, `./`)
5. CSS imports last when practical

### Naming Conventions

- Vue component filenames: PascalCase (`PokemonCard.vue`)
- Component tags: PascalCase (`<PokeButton />`)
- Variables/functions: camelCase (`fetchPokemonDataList`)
- Constants: SCREAMING_SNAKE_CASE (`POKEMON_TYPES`)
- Props in script: camelCase (`showTeamAction`)
- Emits: kebab-case (`add-favourite`, `show-pokemon-image`)
- CSS class names: kebab-case (`floating-button-wrapper`)
- Route paths: kebab-case (`/pokemon-detail/:name`)
- Route names: keep existing kebab-case route name style for consistency

### Types and Data Contracts

- Do not introduce TypeScript unless explicitly requested.
- Use runtime validation via `defineProps`.
- For arrays/objects in props, use factory defaults (`default: () => []`, `default: () => ({})`).
- Keep shared enums/keys in `src/utils/constant.js`.
- Keep API mapping close to where API data is consumed.

### Props, Emits, and Reactivity

- Explicitly declare emitted events with `defineEmits([...])`.
- Prefer `const` for refs unless reassignment is necessary.
- Use descriptive boolean names (`isLoading`, `isFavourite`, `showTeamAction`).
- Keep component props stable and avoid mutating props directly.

### Error Handling

- Wrap async work with `try/catch` when using `async/await`.
- For promise chains, keep `.catch(...)` and always clear loading flags.
- Log useful context, not only raw errors.
- Return safe fallbacks (`null`, `[]`, early return) when UI can recover.
- Do not silently swallow errors.

### API and State Placement

- Put network calls in `src/manager/` and export named functions.
- Keep router setup in `src/router/index.js`.
- Keep pseudo-local storage helpers in `src/store/`.
- Keep cross-feature utilities/constants in `src/utils/`.
- Keep route-level behavior in `src/views/`.

### Router Patterns

- Prefer lazy-loaded views for non-root routes.
- Keep a fallback route for unknown paths.
- Preserve existing URL conventions when adding new routes.

### CSS and Styling

- Use `<style scoped>` by default in Vue SFCs.
- Reuse CSS variables from `src/assets/base.css`.
- Use kebab-case class names.
- Keep responsive behavior aligned with existing breakpoints:
  - tablet: `min-width: 768px`
  - desktop: `min-width: 1024px`

## File Structure Reference

```text
src/
  assets/           # global CSS and variables
  components/       # reusable and feature UI components
  components/base/  # base primitives (button, modal, chip, etc.)
  manager/          # API modules
  router/           # Vue Router configuration
  store/            # pseudolocal persistence logic
  utils/            # constants and utility helpers
  views/            # route-level pages
  App.vue           # root component
  main.js           # application entry point
```

## Agent Change Checklist

1. Run `npm run lint` after edits.
2. Run `npm run build` for integration safety.
3. Update this file when conventions or commands change.
4. Preserve current JavaScript/Vue conventions unless asked to refactor globally.
