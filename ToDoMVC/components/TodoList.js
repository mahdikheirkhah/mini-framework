import { createElement } from '../../framework/app.js';
import { store } from '../../framework/app.js';
import { TodoItem } from './TodoItem.js';

export function TodoList() {
    const state = store.getState();
    const { todos, filter } = state;

    // Filter todos based on current filter
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    // Toggle all todos
    function handleToggleAll(e) {
        const toggleAllSwitch = document.getElementById('toggle-all')
        const completed = !toggleAllSwitch.checked;

        store.setState({
            todos: todos.map(todo => ({
                ...todo,
                completed
            }))
        });
    }

    // Only show toggle-all if there are todos
    const toggleAll = todos.length > 0 ? 
        createElement('div', { className: 'toggle-all-container', onclick: handleToggleAll }, [
            createElement('input', {
                id: 'toggle-all',
                className: 'toggle-all',
                type: 'checkbox',
                checked: todos.length > 0 && todos.every(t => t.completed),
                'data-testid': 'toggle-all'
            }),
            createElement('label', {
                htmlFor: 'toggle-all'
            }, ['Mark all as complete'])
        ])
     : [];

    return createElement('main', { className: 'main' }, [
        toggleAll,
        createElement('ul', { className: 'todo-list' },
            filteredTodos.map(todo => TodoItem(todo))
        )
    ]);
}