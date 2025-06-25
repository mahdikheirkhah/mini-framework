import { createElement, createApp, store } from '../framework/app.js';
import { TodoList } from './components/TodoList.js';
import { TodoInput } from './components/TodoInput.js';
import { TodoFooter } from './components/TodoFooter.js';
import { mount } from '../framework/dom.js';

// Initialize store with todos array and filter
store.setState({
    todos: [],
    filter: 'all' // can be 'all', 'active', or 'completed'
});

const DOMBody = document.getElementById('body');

// Create and mount sidebar content
function Sidebar() {
    return createElement('aside', { className: 'learn' }, [
        createElement('header', {}, [
            createElement('h3', {}, ['Mini-framework']),
            createElement('span', { className: 'source-links' }, [
                createElement('h5', {}, ['JavaScript']),
                createElement('a', { href: 'https://github.com/mahdikheirkhah/mini-framework/blob/master/documentation.md', target: '_blank' }, ['Source'])
            ])
        ]),
        createElement('hr'),
        createElement('blockquote', { className: 'quote speech-bubble' }, [
            createElement('p', {}, ['This mini-framework helps build user interfaces with a virtual DOM, state management, and event-driven updates — all with minimal code.']),
            createElement('footer', {}, [
                createElement('a', { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        target: '_blank' }, ['Learn JavaScript on MDN'])
            ])
        ]),
        createElement('hr'),
        // createElement('h4', {}, ['Official Resources']),
        // createElement('ul', {}, [
        //     createElement('li', {}, [
        //         createElement('a', { href: 'https://react.dev/learn' }, ['Quick Start'])
        //     ]),
        //     createElement('li', {}, [
        //         createElement('a', { href: 'https://react.dev/reference/react' }, ['API Reference'])
        //     ]),
        //     createElement('li', {}, [
        //         createElement('a', { href: 'https://petehuntsposts.quora.com/React-Under-the-Hood' }, ['Philosophy'])
        //     ]),
        //     createElement('li', {}, [
        //         createElement('a', { href: 'https://react.dev/community' }, ['React Community'])
        //     ])
        // ]),
        createElement('h4', {}, ['Contributors']),
            createElement('li', {}, [
                createElement('a', { 
                    href: 'https://github.com/olegamobile', 
                    target: '_blank' 
                }, ['Oleg Balandin'])
            ]),
        createElement('li', {}, [
        createElement('a', {
            href: 'https://github.com/mahdikheirkhah',
            target: '_blank'
        }, ['Mohammad Mahdi Kheirkhah'])
    ]),
    createElement('li', {}, [
        createElement('a', {
            href: 'https://github.com/Inkasaa',
            target: '_blank'
        }, ['Inkasaa'])
    ]),
    createElement('li', {}, [
        createElement('a', {
            href: 'https://github.com/mavka1207',
            target: '_blank'
        }, ['Kateryna Ovsiienko'])
    ]),
    createElement('li', {}, [
        createElement('a', {
            href: 'https://github.com/fatemekh78',
            target: '_blank'
        }, ['fatemekh'])
    ]),
        createElement('footer', {}, [
            createElement('hr'),
            createElement('em', {}, [
                'If you have other helpful links to share, or find any of the links above no longer work, please ',
                createElement('a', { href: 'https://github.com/mahdikheirkhah/mini-framework/issues', target: '_blank' }, ['let us know']),
                '.'
            ])
        ])
    ]);
}

function Footer() {

// return the following DOM structure:
//    
// <footer class="info">
//     <p>Double-click to edit a todo</p>
//     <p>Created using custom framework</p>
//     <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
// </footer>

 return createElement('footer', { className: 'info' }, [
        createElement('p', {}, ['Double-click to edit a todo']),
        createElement('p', {}, ['Created using custom framework']),
        createElement('p', {}, ['Part of ',
        createElement('a', { href: 'http://todomvc.com' }, ['TodoMVC'])]),
])
}

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

// Create and mount Sidebar to the <body>
mount(Sidebar(), DOMBody);

// Create app container <section id="app"> and mount it to the <body>
mount(createElement('section', { className: 'todoapp', id: 'app' }, []), DOMBody);

// Create and mount the app to the container
const app = createApp(App, document.getElementById('app'));
// Export app instance for potential external use
export { app };

// Create and mount Footer to the <body>
mount(Footer(), DOMBody);

