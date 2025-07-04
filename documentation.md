
# Mini-Framework Documentation

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Basic Setup](#basic-setup)
- [Core Features](#core-features)
  - [1. Creating Elements](#1-creating-elements)
  - [2. State Management](#2-state-management)
  - [3. Routing](#3-routing)
- [Building Components](#building-components)
- [Why Things Work This Way](#why-things-work-this-way)
- [Best Practices](#best-practices)
- [Example TodoMVC Implementation](#example-todomvc-implementation)

## Overview

This is a lightweight JavaScript framework that provides essential features for building modern web applications:

- Virtual DOM for efficient DOM manipulation
- State management
- Event handling system
- Routing capabilities

## Getting Started

### Basic Setup

```javascript
import { createApp, createElement } from './framework/app.js';

// Create a simple component
function App() {
    return createElement('div', { className: 'app' }, [
        createElement('h1', {}, ['Hello World'])
    ]);
}

// Mount the app
const app = createApp(App, document.getElementById('root'));
```

## Core Features

### 1. Creating Elements

The framework uses a virtual DOM system. Elements are created using the `createElement` function. You can also add event handlers directly in the atrributes list:

```javascript
createElement(tag, attributes, children)
```

Example:

```javascript
// Create a button with a click handler
createElement('button', {
    className: 'btn',
    onClick: () => console.log('Clicked!')
}, ['Click me']);

// Create nested elements
createElement('div', { className: 'container' }, [
    createElement('h1', {}, ['Title']),
    createElement('p', {}, ['Content'])
]);
```

### 2. State Management

The framework includes a centralized state management system:

```javascript
import { store } from './framework/app.js';

// Get current state
const state = store.getState();

// Update state
store.setState({ count: 1 });

// Update state based on previous state
store.setState(prevState => ({
    count: prevState.count + 1
}));

// Subscribe to state changes
const unsubscribe = store.subscribe(state => {
    console.log('State changed:', state);
});

// Unsubscribe when needed
unsubscribe();
```


### 3. Routing

The routing system helps manage navigation and URL states:

```javascript
import { router } from './framework/app.js';

// Define routes
router.addRoute('/', () => {
    // Handle home page
});

router.addRoute('/about', () => {
    // Handle about page
});

// Navigate programmatically
router.navigate('/about');
```

## Building Components

Here's an example of a counter component using all major features:

```javascript
import { createElement } from './framework/app.js';
import { store } from './framework/app.js';

function Counter() {
    const state = store.getState();
    
    return createElement('div', {}, [
        createElement('h2', {}, [`Count: ${state.count || 0}`]),
        createElement('button', {
            onClick: () => store.setState(state => ({
                count: (state.count || 0) + 1
            }))
        }, ['Increment'])
    ]);
}
```

## Why Things Work This Way

1. **Virtual DOM**: We use a virtual DOM to minimize actual DOM manipulations, which are expensive. The framework compares the virtual DOM with the real DOM and only updates what's necessary.

2. **Centralized State**: A centralized store makes it easier to manage application state and ensures all components have access to the same data. State changes trigger re-renders automatically.

3. **Routing**: The router synchronizes the URL with the application state, enabling bookmarkable pages and browser history support.

## Best Practices

1. Keep components small and focused on a single responsibility
2. Use the state management system for shared state only
3. Prefer composition over inheritance when building components
4. Always clean up event listeners and subscriptions when they're no longer needed

## Example TodoMVC Implementation

See the `/todoMVC` directory for a complete example of how to use this framework to build a TodoMVC application.
