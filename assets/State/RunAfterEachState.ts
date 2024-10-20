import Context from "../Utils/Context";
import Hook from "../Unit/Hook";
import Suite, { HookType } from "../Unit/Suite";
import hookRunner from "../Utils/HookRunner";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";

export default class RunAfterEachState implements IState {
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
        this._suites.reverse();
    }

    private _runHooks() {
        if (this._suites.length == 0) {
            this._goToNextState();
            return;
        }

        const suite: Suite = this._suites.shift();
        const hooks: Hook[] = suite.hooks.get(HookType.AfterEach);
        hookRunner.runHook(hooks, () => {
            this._runHooks();
        });
    }

    update() {
        if (StateManager.getInstance().waitToNextFrame) {
            StateManager.getInstance().waitToNextFrame = false;
            this._goToNextState();
        }
    }

    private _goToNextState() {
        if (Context.currentSuite.tests.length == 0) {
            StateManager.getInstance().setState(StateID.RunAfterAll);
            return;
        }

        if (StateManager.getInstance().waitToNextFrame == false) {
            StateManager.getInstance().setState(StateID.RunBeforeEach);
        }
    }

    exit() { }
}

StateManager.getInstance().registerState(StateID.RunAfterEach, new RunAfterEachState());