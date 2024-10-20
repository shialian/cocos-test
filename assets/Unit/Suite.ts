import Hook from "./Hook";
import Test from "./Test";
import { TestFunction, TestConfig } from "../Configuration/TestConfig";

export enum HookType {
    BeforeAll,
    AfterAll,
    BeforeEach,
    AfterEach
}

export default class Suite {

    private _suites: Suite[] = [];
    public get suites(): Suite[] {
        return this._suites;
    }

    private _hooks: Map<HookType, Hook[]> = new Map<HookType, Hook[]>();
    public get hooks(): Map<HookType, Hook[]> {
        return this._hooks;
    }

    private _tests: Test[] = [];
    public get tests(): Test[] {
        return this._tests;
    }

    private _parent: Suite = null;
    public get parent(): Suite {
        return this._parent;
    }

    private _title: string = "";
    public get title(): string {
        return this._title;
    }

    private _config: TestConfig = {};

    constructor(parent: Suite, title: string) {
        this._parent = parent;
        this._title = title;
        parent?.addSuite(this);
    }

    public addSuite(suite: Suite) {
        this._suites.push(suite);
    }

    public addTest(test: Test) {
        this._tests.push(test);
    }

    public addHook(type: HookType, title: string, fn: TestFunction): Hook {
        if (!this._hooks.has(type)) {
            this._hooks.set(type, []);
        }

        const hook: Hook = new Hook(title, fn);
        this._hooks.get(type).push(hook);
        return hook;
    }
}