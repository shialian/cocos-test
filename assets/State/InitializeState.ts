import { Event } from "../Configuration/EventConfig";
import Context from "../Utils/Context";
import eventManager from "../Utils/EventManager";
import { IState, StateID } from "./StateDefine";
import StateManager from "./StateManger";

export default class InitializeState implements IState {
    enter() {
        Context.isRunning = true;
        eventManager.emit(Event.Test.RunTest);
        StateManager.getInstance().setState(StateID.RunASuite);
    }

    update() { }

    exit() { }
}

StateManager.getInstance().registerState(StateID.Initialize, new InitializeState());