
export type TestFunction = (() => void) | ((done: () => void) => PromiseLike<void>);

export interface TestConfig {
    timeLimit?: number;
}