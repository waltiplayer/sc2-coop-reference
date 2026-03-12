# Project Documentation Rules (Non-Obvious Only)
- Data definitions for commanders and maps are in public/ as JSON files, not in src/
- Component interfaces are defined inline with their usage rather than in separate type files
- The public folder contains the actual data (commanders.json, maps.json) that drives the UI
- Documentation about data structure must be inferred from the JSON files themselves as there are no separate schema files
- Understanding the data flow requires tracing from fetch calls in useEffect to state updates to JSX rendering