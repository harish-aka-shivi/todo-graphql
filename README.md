## Architecture
- Follows the component, container directory structure. 
  - containers are page layouts and components being the simple components
- `useTaskApi` hook act an abstraction to use all the graphql methods.
- `DataProvider` uses the Context API to maintain the global state.


## Improvements to be done
- Accessibilty
- Better UI
- Search feature

## Testing strategy
Although tests are not done yet, but some tests that can be written
- Write test cases for `useTaskAPI` hook, proper data is returned
- When there are n tasks, it should render n task item on screen
