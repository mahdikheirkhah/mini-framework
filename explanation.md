# Mini-Framework Explanation

## Framework Overview (Beginner Level)

### What is this framework?
This is a simple JavaScript framework that helps you build web applications. Think of it like a mini version of React - it helps you create interactive websites without writing complex DOM manipulation code.

### Core Concepts

**1. Virtual DOM (`dom.js`)**
```javascript
// Instead of writing HTML directly, you create "virtual" elements
createElement('div', { className: 'container' }, ['Hello World'])
// This becomes: <div class="container">Hello World</div>
```

- `createElement()` - Creates a virtual representation of HTML elements
- `mount()` - Takes virtual elements and creates real HTML elements in the browser
- No complex patching - when something changes, we clear everything and rebuild (simple but works!)

**2. State Management (`state.js`)**
```javascript
// Store holds all your app's data
store.setState({ todos: [], filter: 'all' })
// When data changes, the app automatically re-renders
```

- `Store` class - Keeps track of your app's data
- When you call `setState()`, it notifies all components to update
- Like a central database for your app

**3. App Renderer (`app.js`)**
```javascript
// This connects everything together
const app = createApp(App, container)
// App = your main component, container = where to put it
```

- `AppRenderer` - Watches for state changes and re-renders your app
- `createApp()` - Sets up everything and starts your app

### How it works:
1. You write components (functions that return virtual DOM)
2. Framework converts virtual DOM to real HTML
3. When state changes, framework clears old HTML and creates new HTML
4. Simple but effective!

---

## Todo App Explanation

### App Structure
```
App (main container)
├── Sidebar (info about the framework)
├── TodoApp Section
│   ├── Header (title + input)
│   ├── TodoList (list of todos)
│   └── TodoFooter (filters + clear button)
└── Footer (credits)
```

### Key Components

**1. TodoInput.js**
- Creates the input field where you type new todos
- When you press Enter, it adds the todo to the state
- Uses `store.setState()` to add new todos

**2. TodoItem.js**
- Represents a single todo item
- Has checkbox (to mark complete), label (todo text), delete button
- Double-click label to edit the todo
- Each action updates the state

**3. TodoList.js**
- Shows all todos based on current filter (All/Active/Completed)
- Has "toggle all" checkbox to mark all todos as complete/incomplete
- Maps over todos array and creates TodoItem for each

**4. TodoFooter.js**
- Shows count of remaining todos
- Filter buttons (All, Active, Completed)
- "Clear completed" button to remove finished todos

### Data Flow
1. User types in input → TodoInput adds to state
2. State changes → Framework re-renders entire app
3. TodoList reads new state → Shows updated list
4. User clicks checkbox → TodoItem updates state
5. State changes → App re-renders again

### State Structure
```javascript
{
  todos: [
    { id: 1, text: "Learn JavaScript", completed: false },
    { id: 2, text: "Build todo app", completed: true }
  ],
  filter: 'all' // 'all', 'active', or 'completed'
}
```

The beauty is in its simplicity - when anything changes, the whole app rebuilds itself. Not the most efficient, but very easy to understand and debug!

---

## Framework Functions Explained

### DOM Module (`dom.js`)

**`createElement(tag, attrs, children)`**
```javascript
createElement('div', { className: 'box' }, ['Hello'])
// Creates: { tag: 'div', attrs: { className: 'box' }, children: [{ tag: 'text', text: 'Hello' }] }
```
- Creates virtual DOM nodes (JavaScript objects representing HTML)
- Converts strings/numbers to text nodes automatically
- Flattens nested arrays of children

**`applyAttributes(element, attrs)`**
```javascript
applyAttributes(divElement, { className: 'red', onclick: handleClick })
// Sets: element.className = 'red', element.onclick = handleClick
```
- Applies attributes to real DOM elements
- Handles events (`on*` attributes) by setting element properties
- Handles refs by calling the function with the element
- Converts `className` to `class` attribute
- Handles boolean attributes (checked, disabled, etc.)

**`createDomElement(vnode)`**
```javascript
createDomElement({ tag: 'div', attrs: { id: 'box' }, children: [] })
// Returns: <div id="box"></div>
```
- Converts virtual DOM nodes to real DOM elements
- Handles text nodes specially
- Recursively creates children by calling `mount()`
- Returns actual HTML elements

**`mount(vnode, parentElement)`**
```javascript
mount(virtualDiv, document.body)
// Creates real DOM element and appends it to parent
```
- Creates DOM element from virtual node
- Appends it to parent element
- Returns the created element

---

### State Module (`state.js`)

**`Store` Class**
```javascript
const store = new Store({ count: 0 })
```

**`getState()`**
```javascript
const currentState = store.getState()
// Returns: { count: 0 }
```
- Returns current state object
- Read-only access to state

**`setState(newState)`**
```javascript
store.setState({ count: 5 })
// Updates state and notifies all subscribers
```
- Merges new state with existing state
- Triggers all subscribed functions
- Causes app to re-render

**`subscribe(callback)`**
```javascript
const unsubscribe = store.subscribe(() => console.log('State changed!'))
// Returns function to unsubscribe
```
- Adds callback to list of subscribers
- Callback runs whenever state changes
- Returns unsubscribe function

**`notify()`**
```javascript
// Internal function - calls all subscribers
```
- Called automatically by `setState()`
- Executes all subscribed callbacks

---

### App Module (`app.js`)

**`AppRenderer` Class**
```javascript
const renderer = new AppRenderer(App, containerElement)
```

**`render()`**
```javascript
// Internal method that:
// 1. Calls your App component function
// 2. Clears container
// 3. Mounts new virtual DOM
```
- Gets new virtual DOM from your component
- Clears container completely
- Handles arrays of elements (for multiple root elements)
- Mounts section with id="root" to app container
- Mounts other elements to document.body

**`start()`**
```javascript
renderer.start()
// Subscribes to state changes and does initial render
```
- Subscribes to store changes
- Does first render
- Sets up automatic re-rendering

**`destroy()`**
```javascript
renderer.destroy()
// Cleans up subscriptions
```
- Unsubscribes from store
- Prevents memory leaks

**`createApp(rootComponent, container)`**
```javascript
const app = createApp(App, document.body)
// Returns: { store, router, destroy }
```
- Creates AppRenderer instance
- Starts the renderer
- Initializes router
- Returns app object with utilities

---

### Router Module (`router.js`)

**`addRoute(path, handler)`**
```javascript
router.addRoute('/todos', () => console.log('Todos page'))
```
- Maps URL paths to handler functions
- Handlers typically update state

**`navigate(path)`**
```javascript
router.navigate('/todos')
```
- Changes URL and triggers route handler
- Updates browser history

**`handleRoute()`**
```javascript
// Internal - matches current URL to routes
```
- Checks current URL against registered routes
- Calls matching handler

**`init()`**
```javascript
router.init()
```
- Sets up URL change listeners
- Handles initial page load
- Calls route handlers when URL changes

---

### Events Module (`events.js`)

**`EventManager` Class**
- Manages custom events (not heavily used in current app)
- Provides event system for complex interactions

---

## How They Work Together

1. **Component Function** → Returns virtual DOM
2. **createElement()** → Creates virtual DOM objects  
3. **AppRenderer.render()** → Calls component, clears container
4. **mount()** → Converts virtual DOM to real DOM
5. **createDomElement()** → Creates HTML elements
6. **applyAttributes()** → Sets properties and events
7. **Store.setState()** → Updates state, triggers re-render
8. **Router** → Handles URL changes, updates state

The cycle repeats: State change → Re-render → New DOM → User interaction → State change...