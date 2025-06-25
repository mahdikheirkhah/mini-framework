import { createElement, router } from '../../framework/app.js';
import { store } from '../../framework/app.js';

export function TodoFooter() {
    const state = store.getState();
    const { todos, filter } = state;
    
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);
    
    function clearCompleted() {
        store.setState({
            todos: todos.filter(todo => !todo.completed)
        });
    }

    function setFilter(newFilter) {
        store.setState({ filter: newFilter });
    }

    return createElement('footer', { className: 'footer' }, [
        createElement('span', { className: 'todo-count' }, [
            createElement('strong', {}, [String(activeTodos.length)]),
            ` item${activeTodos.length === 1 ? '' : 's'} left`
        ]),
        createElement('ul', { className: 'filters' }, [
            createElement('li', {}, [
                createElement('a', {
                    className: filter === 'all' ? 'selected' : '',
                    href: '#/',
                    onclick: (e) => {
                        e.preventDefault();
                        setFilter('all');
                        router.navigate('/');
                    }
                }, ['All'])
            ]),
            createElement('li', {}, [
                createElement('a', {
                    className: filter === 'active' ? 'selected' : '',
                    href: '#/active',
                    onclick: (e) => {
                        e.preventDefault();
                        setFilter('active');
                        router.navigate('/active');
                    }
                }, ['Active'])
            ]),
            createElement('li', {}, [
                createElement('a', {
                    className: filter === 'completed' ? 'selected' : '',
                    href: '#/completed',
                    onclick: (e) => {
                        e.preventDefault();
                        setFilter('completed');
                        router.navigate('/completed');
                    }
                }, ['Completed'])
            ])
        ]),
        completedTodos.length > 0 ?
            createElement('button', {
                className: 'clear-completed',
                onclick: clearCompleted
            }, ['Clear completed'])
            : null
    ]);
}