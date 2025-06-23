class TodoApp {
  constructor() {
    const myStore = new MyFramework.Store( {todos: [], filter: 'all'} );
    this.store = myStore;
    this.render();
    this.setupEvents();
  }

  render() {
    const { todos, filter } = this.store.getState();
    const filteredTodos = this.filterTodos(todos, filter);
    
    const header = new VNode('h1', {}, ['todos']);
    const input = new VNode('input', {
      class: 'new-todo',
      id: 'new-todo-input',          // Added for accessibility
      name: 'new-todo',             // Added for form submission
      placeholder: 'What needs to be done?',
      'data-action': 'add-todo',
      autocomplete: 'off'           // Explicitly control autocomplete
    });
    const todoList = new VNode('ul', { class: 'todo-list' },
      filteredTodos.map(todo => this.renderTodo(todo))
    );

    const appNode = new VNode('div', { class: 'todoapp' }, [
      header,
      input,
      todoList
    ]);

    const appElement = appNode.render();
    const root = document.getElementById('app');
    root.innerHTML = '';
    root.appendChild(appElement);
  }

  filterTodos(todos, filter) {
    if (filter === 'active') return todos.filter(todo => !todo.completed);
    if (filter === 'completed') return todos.filter(todo => todo.completed);
    return todos;
  }

  renderTodo(todo) {
    return new VNode('li', { class: todo.completed ? 'completed' : '' }, [
      new VNode('div', { class: 'view' }, [
        new VNode('input', {
          class: 'toggle',
          type: 'checkbox',
          checked: todo.completed,
          'data-action': 'toggle-todo',
          'data-id': todo.id
        }),
        new VNode('label', {}, [todo.text]),
        new VNode('button', {
          class: 'destroy',
          'data-action': 'delete-todo',
          'data-id': todo.id
        })
      ])
    ]);
  }

  setupEvents() {
    // Handle Enter key in new todo input
    document.querySelector('.new-todo').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = e.target.value.trim();
        if (text) {
          const newTodo = { id: Date.now(), text, completed: false };
          this.store.setState({
            todos: [...this.store.getState().todos, newTodo]
          });
          e.target.value = '';
        }
      }
    });

    // Handle click events for checkboxes and delete buttons
    document.addEventListener('click', (e) => {
      const action = e.target.getAttribute('data-action');
      const id = e.target.getAttribute('data-id');

      if (action === 'toggle-todo') {
        const todos = this.store.getState().todos.map(todo =>
          todo.id === +id ? { ...todo, completed: !todo.completed } : todo
        );
        this.store.setState({ todos });
      }

      if (action === 'delete-todo') {
        const todos = this.store.getState().todos.filter(todo => todo.id !== +id);
        this.store.setState({ todos });
      }
    });

    this.store.subscribe(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});