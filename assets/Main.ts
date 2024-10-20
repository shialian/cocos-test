import Hook from "./Unit/Hook";
import Suite, { HookType } from "./Unit/Suite";
import Test from "./Unit/Test";
import { TestFunction } from "./Configuration/TestConfig";
import StateManager from "./State/StateManger";
import { StateID } from "./State/StateDefine";
import Context from "./Utils/Context";

Context.rootSuite = new Suite(null, "");
Context.currentSuite = Context.rootSuite;

export function run() {
    if (Context.isRunning) {
        return;
    }

    StateManager.getInstance().setState(StateID.Initialize);
}

export function describe(title: string, fn: Function): Suite {
    if (Context.isRunning) {
        throw new Error("Cannot have a describe block inside a test block");
    }

    const suite: Suite = new Suite(Context.currentSuite, title);
    Context.currentSuite = suite;
    fn?.();
    Context.currentSuite = Context.currentSuite.parent;
    return suite;
}

export function it(title: string, fn: TestFunction): Test {
    if (Context.isRunning) {
        throw new Error("Cannot have a test block inside a test block");
    }
    const test: Test = new Test(title, fn);
    Context.currentSuite.addTest(test);
    return test;
}

export function beforeAll(title: string, fn: TestFunction): Hook {
    if (Context.isRunning) {
        throw new Error("Cannot have a beforeAll block inside a test block");
    }

    return Context.currentSuite.addHook(HookType.BeforeAll, title, fn);
}

export function afterAll(title: string, fn: TestFunction): Hook {
    if (Context.isRunning) {
        throw new Error("Cannot have a afterAll block inside a test block");
    }

    return Context.currentSuite.addHook(HookType.AfterAll, title, fn);
}

export function beforeEach(title: string, fn: TestFunction): Hook {
    if (Context.isRunning) {
        throw new Error("Cannot have a beforeEach block inside a test block");
    }

    return Context.currentSuite.addHook(HookType.BeforeEach, title, fn);
}

export function afterEach(title: string, fn: TestFunction): Hook {
    if (Context.isRunning) {
        throw new Error("Cannot have a afterEach block inside a test block");
    }

    return Context.currentSuite.addHook(HookType.AfterEach, title, fn);
}