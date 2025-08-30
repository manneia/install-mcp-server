# MCP Server Frontend

This is the frontend for the MCP Server project, built with Vue 3, Vite, and Element Plus.

## Project Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Tech Stack

- **Build Tool**: Vite
- **Framework**: Vue 3 (TypeScript)
- **UI Component Library**: Element Plus
- **HTTP Client**: Axios
- **JSON Editor**: @json-editor/json-editor
- **Package Manager**: pnpm

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable components
│   │   └── JsonEditor.vue  # JSON editor component
│   ├── views/              # Page components
│   │   └── PluginManager.vue # Plugin management page
│   ├── App.vue             # Root component
│   └── main.ts             # Entry point
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## Features

1. **Plugin Management**:
   - View installed plugins in a table format
   - Start/stop plugins
   - Uninstall plugins

2. **Plugin Installation**:
   - Install new plugins via JSON configuration
   - JSON editor for plugin configuration input

3. **Responsive UI**:
   - Built with Element Plus components
   - Clean and modern interface

## Development

The frontend communicates with the backend API through Axios. The main components are:

- `PluginManager.vue`: Main view for plugin management
- `JsonEditor.vue`: Wrapper for the JSON editor component

## Building

To build the project for production:

```bash
pnpm run build
```

The built files will be in the `dist` directory.