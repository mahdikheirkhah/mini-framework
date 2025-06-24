import { createElement } from '../../framework/app.js';
import { store } from '../../framework/app.js';

export function TodoInput() {
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const value = e.target.value.trim();
            if (value && value.length >= 2) {
                const state = store.getState();
                store.setState({
                    todos: [...state.todos, {
                        id: Date.now(),
                        text: value,
                        completed: false
                    }]
                });
                e.target.value = '';
                // Restore focus after state update

                setTimeout(() => {
                    const input = document.querySelector('.new-todo')
                    if (input) input.focus()
                }, 0);
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