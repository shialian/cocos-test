import Hook from "../Unit/Hook";

class HookRunner {
    public runHook(hooks: Hook[], done?: Function) {
        if (!hooks) {
            done?.();
            return;
        }

        this._nextHook(hooks, 0, done);
    }

    private _nextHook(hooks: Hook[], index: number, done?: Function) {
        if (index >= hooks.length) {
            done?.();
            return;
        }

        hooks[index].run(() => {
            this._nextHook(hooks, index + 1, done);
        });
    }
}

const hookRunner = new HookRunner();
export default hookRunner;
