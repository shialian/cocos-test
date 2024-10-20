import Context from "../Utils/Context";
import Hook from "../Unit/Hook";
import Suite, { HookType } from "../Unit/Suite";
import hookRunner from "../Utils/HookRunner";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";

export default class RunBeforeEachState implements IState {
    private _suites: Suite[] = [];

    enter() {
        this._setSuites();
        this._runHooks();
    }

    private _setSuites() {
        let parent: Suite = Context.currentSuite.parent;
        while (parent != null) {
            this._suites.push(parent);
            parent = parent.parent;
        }
        this._suites.unshift(Context.currentSuite);
    }

    private _runHooks() {
        if (this._suites.length == 0) {
            StateManager.getInstance().setState(StateID.RunATest);
            return;
        }

        const suite: Suite = this._suites.shift();
        const hooks: Hook[] = suite.hooks.get(HookType.BeforeEach);
        hookRunner.runHook(hooks, () => {
            this._runHooks();
        });
    }

    update() { }

    exit() { }
}

StateManager.getInstance().registerState(StateID.RunBeforeEach, new RunBeforeEachState());