import { TestFunction, TestConfig } from "../Configuration/TestConfig";

const DefaultTimeLimit: number = 4000;

export default class Runnable {
    private _fn: Function = null;
    private _isAsync: boolean = false;
    private _config: TestConfig = {};

    private _timer: NodeJS.Timeout = null;

    private _isTimeout: boolean = false;
    public get isTimeout(): boolean {
        return this._isTimeout;
    }

    private _title: string = "";
    public get title(): string {
        return this._title;
    }

    public constructor(tilte: string, fn: TestFunction) {
        this._title = tilte;
        this._fn = fn;
        this._isAsync = fn && fn.toString().includes("Promise");  // 轉譯時會將 async function 轉成一般的 function，所以這邊用字串比對來判斷是否為 async function
    }

    public run(done?: Function) {
        this._setTimeout();
        if (this._isAsync) {
            this._callFnAsync(this._fn, done);
        }
        else {
            this._callFn(this._fn, done);
        }
    }

    private _setTimeout() {
        if (this._timer) {
            return;
        }

        const timeLimit: number = this._config?.timeLimit || DefaultTimeLimit;
        this._timer = setTimeout(() => {
            this._isTimeout = true;
            clearTimeout(this._timer);
            this._timer = null;
        }, timeLimit);
    }

    private _callFnAsync(fn: Function, done?: Function) {
        try {
            fn.call(null, () => {
                done?.();
            });
        }
        catch (error) {
            done?.(error);
        }
    }

    private _callFn(fn: Function, done: Function) {
        try {
            fn.call(null);
            done?.();
        }
        catch (error) {
            done?.(error);
        }
    }

    public timeLimit(time: number): Runnable {
        this._config.timeLimit = time;
        return this;
    }
}