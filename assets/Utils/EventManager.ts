// EventManager.ts
export type EventCallback = (...args: any[]) => void;

interface EventMap {
    [key: string]: Array<{ callback: EventCallback; context?: any }>;
}

class EventManager {
    private events: EventMap = {};

    on(event: string, callback: EventCallback, context?: any) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({ callback, context });
    }

    off(event: string, callback: EventCallback, context?: any) {
        if (!this.events[event]) {
            return;
        }

        this.events[event] = this.events[event].filter(
            listener => listener.callback !== callback || listener.context !== context
        );
    }

    emit(event: string, ...args: any[]) {
        if (!this.events[event]) {
            return;
        }

        this.events[event].forEach(listener => {
            listener.callback.apply(listener.context, args);
        });
    }

    once(event: string, callback: EventCallback, context?: any) {
        const onceCallback: EventCallback = (...args: any[]) => {
            callback.apply(context, args);
            this.off(event, onceCallback, context);
        };
        this.on(event, onceCallback, context);
    }
}

const eventManager = new EventManager();
export default eventManager;
