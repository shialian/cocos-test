import Context from "../Utils/Context";
import Hook from "../Unit/Hook";
import { HookType } from "../Unit/Suite";
import hookRunner from "../Utils/HookRunner";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";
import eventManager from "../Utils/EventManager";
import { Event } from "../Configuration/EventConfig";

export default class RunAfterAllState implements IState {
    enter() {
        const hooks: Hook[] = Context.currentSuite?.hooks.get(HookType.AfterAll);
        hookRunner.runHook(hooks, () => {
            console.groupEnd();
            StateManager.getInstance().setState(StateID.RunASuite);
        });
    }

    update() { }

    exit() {
        eventManager.emit(Event.Test.OnSuiteFinished);
    }
}

StateManager.getInstance().registerState(StateID.RunAfterAll, new RunAfterAllState());