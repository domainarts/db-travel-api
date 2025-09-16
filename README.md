# DB Travel API Demo

This project is a modern Nuxt 4/Vue 3 web app for searching train stations and connections with Deutsche Bahn. 
It uses Pinia for state management, Tailwind CSS for styling, and connects to the API via custom endpoints.

## Features
- Search for train stations and display connections
- Detail pages with filter and loading bar
- State management with Pinia
- Responsive UI with Tailwind CSS
- Custom API endpoints (`/api/locations`, `/api/journeys`)
- Unit tests with Vitest and Testing Library

## Project Structure
```
├── app/
│   ├── components/         # UI components (Header, Footer, etc.)
│   ├── pages/              # Pages (index.vue, station/[id].vue)
│   ├── stores/             # Pinia stores
│   ├── types/              # Custom type declarations
├── bruno/                  # Brunofiles for API testing
├── public/                 # Static files
├── server/api/             # API endpoints
├── tests/unit/             # Unit tests
├── nuxt.config.ts          # Nuxt configuration
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
```

## Dependencies
NodeJS 20 or higher

## Setup & Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start development server:
   ```sh
   npm run dev
   ```
3. Open the app in your browser: [http://localhost:3000](http://localhost:3000)

## Tests
- Run unit tests:
  ```sh
  npm run test
  ```
- Test files are located in `tests/unit/`
- Component and store tests are already provided

## API Endpoints
- `/api/locations`: Search for stations
- `/api/journeys`: Search for connections

## Types & Aliases
- Custom types are in `types/`
- TypeScript aliases for `@/` are configured in `tsconfig.json` and `vitest.config.ts`
