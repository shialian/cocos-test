import { Director, director } from "cc";
import { IState, StateID } from "./StateDefine";

export default class StateManager {
    private static _instance: StateManager = null;
    private _states: Map<StateID, IState> = new Map<StateID, IState>();
    private _currentState: IState = null;

    private _waitToNextFrame: boolean = false;
    public get waitToNextFrame() {
        return this._waitToNextFrame;
    }

    public set waitToNextFrame(value: boolean) {
        this._waitToNextFrame = value;
    }

    private constructor() {
        director.on(Director.EVENT_BEFORE_UPDATE, this.update, this);
    }

    public static getInstance(): StateManager {
        if (StateManager._instance === null) {
            StateManager._instance = new StateManager();
        }
        return StateManager._instance;
    }

    public registerState(id: StateID, state: IState) {
        this._states.set(id, state);
    }

    public unregisterState(id: StateID) {
        this._states.delete(id);
    }

    public setState(id: StateID) {
        if (this._currentState) {
            this._currentState.exit();
        }

        this._currentState = this._states.get(id);

        if (this._currentState) {
            this._currentState.enter();
        }
    }

    private update() {
        if (this._currentState) {
            this._currentState.update();
        }
    }

    public exit() {
        if (this._currentState) {
            this._currentState.exit();
            this._currentState = null;
        }
    }
}