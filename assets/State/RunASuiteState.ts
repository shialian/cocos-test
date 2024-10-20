import Context from "../Utils/Context";
import Suite from "../Unit/Suite";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";

export default class RunASuiteState implements IState {
    enter() {
        this._setCurrentSuite();
        if (Context.currentSuite == null) {
            console.log("No suite to run");
            StateManager.getInstance().exit();
            return;
        }
        console.groupCollapsed(`%cCurrent suite: ${Context.currentSuite.title}`, "color: DarkOrange");
        StateManager.getInstance().setState(StateID.RunBeforeAll);
    }

    private _setCurrentSuite() {
        if (Context.currentSuite == null) {
            Context.currentSuite = Context.rootSuite;
            return;
        }

        let suite: Suite = Context.currentSuite.suites.shift();
        while (suite == null && Context.currentSuite?.parent != null) {
            Context.currentSuite = Context.currentSuite.parent;
            suite = Context.currentSuite.suites.shift();
        }
        Context.currentSuite = suite;
    }

    update() { }

    exit() { }
}

StateManager.getInstance().registerState(StateID.RunASuite, new RunASuiteState());