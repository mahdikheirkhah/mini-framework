import { createElement } from '../../framework/app.js';
import { store } from '../../framework/app.js';

export function TodoItem(todo) {
    let editInput = null;
    
    function startEditing(e) {
        const li = e.target.closest('li');
        li.classList.add('editing');
        editInput.value = todo.text;
        editInput.focus();
    }

    function handleEdit(e) {
        if (e.key === 'Enter' || e.type === 'blur') {
            const value = e.target.value.trim();
            const state = store.getState();
            
            if (value) {
                store.setState({
                    todos: state.todos.map(t =>
                        t.id === todo.id ? { ...t, text: value } : t
                    )
                });
            } else {
                // Remove todo if empty
                store.setState({
                    todos: state.todos.filter(t => t.id !== todo.id)
                });
            }
            
            e.target.closest('li').classList.remove('editing');
        } else if (e.key === 'Escape') {
            e.target.value = todo.text;
            e.target.closest('li').classList.remove('editing');
        }
    }

    function toggleTodo() {
        const state = store.getState();
        store.setState({
            todos: state.todos.map(t =>
                t.id === todo.id ? { ...t, completed: !t.completed } : t
            )
        });
    }

    function removeTodo() {
        const state = store.getState();
        store.setState({
            todos: state.todos.filter(t => t.id !== todo.id)
        });
    }

    return createElement('li', {
        className: `${todo.completed ? 'completed' : ''}`
    }, [
        createElement('div', { className: 'view' }, [
            createElement('input', {
                className: 'toggle',
                type: 'checkbox',
                checked: todo.completed,
                onclick: toggleTodo
            }),
            createElement('label', {
                ondblclick: startEditing
            }, [todo.text]),
            createElement('button', {
                className: 'destroy',
                onclick: removeTodo
            })
        ]),
        createElement('input', {
            className: 'edit',
            onkeydown: (e) => handleEdit(e),
            onblur: (e) => handleEdit(e),
            ref: (el) => { editInput = el; }
        })
    ]);
}