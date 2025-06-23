/**
 * Event handling system
 */
class EventManager {
    constructor() {
        this.events = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - Name of the event
     * @param {Function} handler - Event handler function
     * @returns {Function} Unsubscribe function
     */
    on(eventName, handler) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Set());
        }
        
        this.events.get(eventName).add(handler);
        
        return () => this.off(eventName, handler);
    }

    /**
     * Unsubscribe from an event
     * @param {string} eventName - Name of the event
     * @param {Function} handler - Event handler function
     */
    off(eventName, handler) {
        const handlers = this.events.get(eventName);
        if (handlers) {
            handlers.delete(handler);
            if (handlers.size === 0) {
                this.events.delete(eventName);
            }
        }
    }

    /**
     * Emit an event
     * @param {string} eventName - Name of the event
     * @param {*} data - Event data
     */
    emit(eventName, data) {
        const handlers = this.events.get(eventName);
        if (handlers) {
            for (const handler of handlers) {
                handler(data);
            }
        }
    }

    /**
     * Subscribe to an event for one time only
     * @param {string} eventName - Name of the event
     * @param {Function} handler - Event handler function
     */
    once(eventName, handler) {
        const onceHandler = (data) => {
            handler(data);
            this.off(eventName, onceHandler);
        };
        return this.on(eventName, onceHandler);
    }
}

// Create a global event bus
const eventBus = new EventManager();

export { EventManager, eventBus };