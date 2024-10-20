import Context from "../Utils/Context";
import Hook from "../Unit/Hook";
import { HookType } from "../Unit/Suite";
import hookRunner from "../Utils/HookRunner";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";

export default class RunBeforeAllState implements IState {
    enter() {
        const hooks: Hook[] = Context.currentSuite?.hooks.get(HookType.BeforeAll);
        hookRunner.runHook(hooks, () => {
            this._goToNextState();
        });
    }

    private _goToNextState() {
        if (Context.currentSuite.tests.length == 0) {
            StateManager.getInstance().setState(StateID.RunAfterAll);
            return;
        }
        StateManager.getInstance().setState(StateID.RunBeforeEach);
    }

    update() { }

    exit() { }
}

StateManager.getInstance().registerState(StateID.RunBeforeAll, new RunBeforeAllState());