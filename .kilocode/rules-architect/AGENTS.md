# Project Architecture Rules (Non-Obvious Only)
- The app follows a simple two-view architecture: Commander data and Map data, each with independent data fetching
- State is managed locally in each component rather than using global state management (Redux, Context, etc.) due to low complexity
- Data flows from public JSON files → fetch in useEffect → component state → JSX rendering
- The architecture assumes data is static and infrequently changing, hence direct JSON file fetching rather than API calls
- Component independence allows for separate development and testing of CommanderList and MapList features
- The use of PicoCSS provides a minimal CSS framework foundation with custom overrides only where absolutely necessary