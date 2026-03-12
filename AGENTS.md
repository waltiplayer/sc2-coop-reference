# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands
- `npm run predeploy` - Required before deployment to GitHub Pages
- `npm run deploy` - Deploys to GitHub Pages (runs build then pushes to gh-pages branch)
- `npm run test` - Runs Jest tests with watch mode; use `-- --watchAll=false` for single run
- `npm run test -- --coverage` - Generates coverage report

## Code Style & Project-Specific Patterns
- Data fetching: Uses `${process.env.PUBLIC_URL}/filename.json` to access public JSON files
- Error handling: Data fetching components use try/catch in useEffect with finally to set loading state
- State pattern: All data-fetching components use [data, error, loading] state triplet
- TypeScript: Interfaces defined inline with components (not in separate types files)
- Deployment: GitHub Pages deployment requires predeploy script to run build first
- Component structure: Each major UI section (CommanderList, MapList) is a separate component in src/components/
- Styling: Uses PicoCSS (imported via index.css) with minimal custom CSS in App.css and index.css