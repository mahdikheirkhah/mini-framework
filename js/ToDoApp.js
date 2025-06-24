import { createElement, createApp, store } from '../framework/app.js';
import { TodoList } from './components/TodoList.js';
import { TodoInput } from './components/TodoInput.js';
import { TodoFooter } from './components/TodoFooter.js';

// Initialize store with todos array and filter
store.setState({
    todos: [],
    filter: 'all' // can be 'all', 'active', or 'completed'
});


// Create and mount sidebar content
function Sidebar() {
    return createElement('aside', { className: 'learn' }, [
        createElement('header', {}, [
            createElement('h3', {}, ['Mini-framework']),
            createElement('span', { className: 'source-links' }, [
                createElement('h5', {}, ['TypeScript + React']),
                createElement('a', { className: 'demo-link', 'data-type': 'local', href: 'https://todomvc.com/examples/typescript-react' }, ['Demo']),
                ', ',
                createElement('a', { href: 'https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react' }, ['Source'])
            ])
        ]),
        createElement('hr'),
        createElement('blockquote', { className: 'quote speech-bubble' }, [
            createElement('p', {}, ['React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.']),
            createElement('footer', {}, [
                createElement('a', { href: 'http://facebook.github.io/react' }, ['React'])
            ])
        ]),
        createElement('hr'),
        createElement('h4', {}, ['Official Resources']),
        createElement('ul', {}, [
            createElement('li', {}, [
                createElement('a', { href: 'https://react.dev/learn' }, ['Quick Start'])
            ]),
            createElement('li', {}, [
                createElement('a', { href: 'https://react.dev/reference/react' }, ['API Reference'])
            ]),
            createElement('li', {}, [
                createElement('a', { href: 'https://petehuntsposts.quora.com/React-Under-the-Hood' }, ['Philosophy'])
            ]),
            createElement('li', {}, [
                createElement('a', { href: 'https://react.dev/community' }, ['React Community'])
            ])
        ]),
        createElement('h4', {}, ['Community']),
        createElement('ul', {}, [
            createElement('li', {}, [
                createElement('a', { href: 'https://stackoverflow.com/questions/tagged/reactjs' }, ['ReactJS on Stack Overflow'])
            ])
        ]),
        createElement('footer', {}, [
            createElement('hr'),
            createElement('em', {}, [
                'If you have other helpful links to share, or find any of the links above no longer work, please ',
                createElement('a', { href: 'https://github.com/tastejs/todomvc/issues' }, ['let us know']),
                '.'
            ])
        ])
    ]);
}

const sidebar = createApp(Sidebar, document.getElementById('sidebar'));

export { sidebar };


// Main App component
function App() {
    const state = store.getState();
    
    return createElement('div', {}, [
        createElement('header', { className: 'header' }, [
            createElement('h1', {}, ['todos']),
            TodoInput()
        ]),
        TodoList(),
        state.todos.length > 0 ? TodoFooter() : null
    ]);
}

// Create and mount the app
const app = createApp(App, document.getElementById('app'));

// Export app instance for potential external use
export { app };