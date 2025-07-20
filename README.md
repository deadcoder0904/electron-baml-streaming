# Electron BAML Streaming

**Electron BAML Streaming** is a desktop application that demonstrates the power of BAML (Boundary AI Markup Language) for generating random user data with LLM streaming capabilities.

## Overview

This cross-platform Electron app showcases how to integrate BAML with Electron to create a seamless user generation experience. The application uses LLMs to generate realistic but fictional user profiles with personal information and addresses.

Key features:

- Generate random user profiles with realistic data
- Stream generation results with real-time visual feedback using BAML streaming
- Demonstrate BAML integration with Electron
- Showcase LLM capabilities in desktop applications
- Implement proper streaming with BAML's @stream attributes

## Technology Stack

- **[Electron](https://www.electronjs.org/)**: Cross-platform desktop app framework
- **[Vite](https://vite.dev/)**: Fast build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)**: Typed JavaScript for robust code
- **[React](https://react.dev/)**: Dynamic UI library
- **[BAML](https://www.boundaryml.com/)**: AI function calling framework

## Installation

Use [Bun](https://bun.sh) for package management to set up the project:

```bash
# Install dependencies
$ bun install

# Run in development mode
$ bun run dev

# Build for distribution
# Windows
$ bun run build:win
# macOS
$ bun run build:mac
# Linux
$ bun run build:linux
```

## Environment Setup

Create a `.env` file based on the `.env.example` template with your API keys:

```
CEREBRAS_API_KEY=your_cerebras_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## BAML Streaming Implementation

This application demonstrates the use of BAML's streaming capabilities:

- **@stream.done**: Applied to fields that should only be streamed when complete (like ID)
- **@stream.not_null**: Applied to fields that must have a value before streaming (like name and gender)
- **@stream.with_state**: Applied to complex objects (like address) to track streaming completion status

The streaming implementation follows these steps:

1. Main process initiates a BAML stream using `b.stream.GenerateRandomUser()`
2. Partial updates are sent to the renderer via IPC as they arrive
3. React component updates the UI in real-time as data streams in
4. Final complete data is returned when the stream completes

## Resources

Explore the tech behind the project:

- [Electron Docs](https://www.electronjs.org/docs)
- [Vite Guide](https://vite.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Docs](https://react.dev)
- [BAML Documentation](https://docs.boundaryml.com/)
- [BAML Streaming Guide](https://docs.boundaryml.com/guide/baml-basics/streaming)
