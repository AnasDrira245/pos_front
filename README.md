

# POS Frontend (Angular)

A simple Angular frontend for a POS (Point of Sale) employee management system.

## Features

- Employee listing, add, edit, delete
- Import employees
- Authentication (login, forgot/reset password, confirm account)

## Requirements

- Node.js (14+ recommended)
- npm or yarn
- Angular CLI (optional, for development)

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

Lint the project:

```bash
npm run lint
```

## Project structure

Main application code lives under `src/app`. Useful files:

- `src/app` - Angular components and modules
- `src/models` - TypeScript models and interfaces
- `src/main.ts` - Angular entrypoint

## Notes

- Update any API base URLs in `src/models/baseURL.ts` if needed.
- If you use the Angular CLI globally, you can run `ng serve` instead of `npm run start`.

## License

This project does not include a license file. Add one if required.

