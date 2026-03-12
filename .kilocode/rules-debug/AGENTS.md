# Project Debug Rules (Non-Obvious Only)
- Test files must be colocated with source files (e.g., App.test.tsx next to App.tsx) for Jest to discover them
- Debugging data fetching issues requires checking network tab for requests to ${process.env.PUBLIC_URL}/*.json endpoints
- Component rendering issues can be inspected by checking if PicoCSS classes are properly applied via index.css
- State update debugging requires verifying the [data, error, loading] triplet is correctly managed in useEffect