import { createElement } from '../../framework/app.js';
import { store } from '../../framework/app.js';

export function TodoInput() {
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const value = e.target.value.trim();
            if (value) {
                const state = store.getState();
                store.setState({
                    todos: [...state.todos, {
                        id: Date.now(),
                        text: value,
                        completed: false
                    }]
                });
                e.target.value = '';
            }
        }
    }

    return createElement('input', {
        className: 'new-todo',
        placeholder: 'What needs to be done?',
        onkeydown: handleKeyDown,
        autofocus: true
    });
}