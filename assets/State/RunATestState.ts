import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";
import Test from "../Unit/Test";
import Context from "../Utils/Context";
import eventManager from "../Utils/EventManager";
import { Event } from "../Configuration/EventConfig";

export default class RunATestState implements IState {
    private _currentTest: Test = null;

    enter() {
        this._currentTest = Context.currentSuite.tests.shift();

        console.log(`%cRunning test: ${this._currentTest.title}`, "color: CornflowerBlue");
        this._currentTest.run(this._done.bind(this));
    }

    update() { }

    private _done(error: Error) {
        if (error) {
            if (this._currentTest.isTimeout) {
                eventManager.emit(Event.Test.OnTestFailed, this._currentTest, error);
                eventManager.emit(Event.Test.RerunTestFinished);
                console.error(error);
            }
            else {
                Context.currentSuite.tests.unshift(this._currentTest);
                StateManager.getInstance().waitToNextFrame = true;
                eventManager.emit(Event.Test.RerunningTest);
            }
        }
        else {
            eventManager.emit(Event.Test.RerunTestFinished);
        }

        StateManager.getInstance().setState(StateID.RunAfterEach);
    }

    exit() { }
}

StateManager.getInstance().registerState(StateID.RunATest, new RunATestState());