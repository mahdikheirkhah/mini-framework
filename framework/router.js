/**
 * Simple routing system
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.defaultHandler = () => {
            console.warn('No default route handler set');
        };
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }

    /**
     * Add a route
     * @param {string} path - URL path
     * @param {Function} handler - Route handler function
     */
    addRoute(path, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Route handler must be a function');
        }
        this.routes.set(path, handler);
    }

    /**
     * Set default route handler
     * @param {Function} handler - Default route handler function
     */
    setDefaultHandler(handler) {
        if (typeof handler !== 'function') {
            throw new Error('Default handler must be a function');
        }
        this.defaultHandler = handler;
    }

    /**
     * Navigate to a route
     * @param {string} path - URL path
     * @param {Object} state - State to pass to history
     */
    navigate(path, state = {}) {
        window.history.pushState(state, '', path);
        this.handleRoute(path);
    }

    /**
     * Handle route change
     * @param {string} path - URL path
     */
    handleRoute(path) {
        const handler = this.routes.get(path);
        if (handler) {
            this.currentRoute = path;
            handler();
        } else if (path === '/') {
            // Special handling for root path
            this.currentRoute = '/';
            this.defaultHandler();
        } else {
            console.warn(`No handler found for path: ${path}`);
            // Fallback to default handler
            this.defaultHandler();
        }
    }

    /**
     * Initialize router with current path
     */
    init() {
        // Add default root handler if none exists
        if (!this.routes.has('/')) {
            this.addRoute('/', this.defaultHandler);
        }
        this.handleRoute(window.location.pathname);
    }
}

// Create a global router instance
const router = new Router();

export { Router, router };