# Project Coding Rules (Non-Obvious Only)
- Data fetching must use `${process.env.PUBLIC_URL}/filename.json` pattern to access JSON files in public folder
- Error handling in data fetching components requires try/catch in useEffect with finally block to set loading state to false
- State management for data fetching follows [data, error, loading] triplet pattern consistently
- TypeScript interfaces are defined inline with components rather than in separate files
- Each major UI section (CommanderList, MapList) must be a separate component in src/components/
- Styling uses PicoCSS framework (imported via index.css) with minimal custom overrides in App.css and index.css