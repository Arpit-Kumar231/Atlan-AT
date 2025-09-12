# Weekend Planner App

A modern React application for planning weekend activities, built with TypeScript, Vite, and Tailwind CSS.

## Features

- 🎯 Activity planning and scheduling
- 📱 Responsive design with mobile support
- 🌙 Dark/Light theme support
- 📊 Activity tracking and analytics
- 🔄 Offline support
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Testing**: Vitest, React Testing Library
- **Package Manager**: pnpm

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd atlan
```

### 2. Install dependencies

```bash
pnpm install
```

If you prefer npm:
```bash
npm install
```

### 3. Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### 4. Build for production

```bash
pnpm build
```

The built files will be in the `dist` directory.



This project uses Vitest for testing with React Testing Library for component testing.

### Run all tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test --watch
```

### Run tests with UI

```bash
pnpm test:ui
```

This will open a web interface for running and debugging tests.


## License

This project is licensed under the MIT License.