export enum StateID {
    Initialize,
    RunASuite,
    RunBeforeAll,
    RunBeforeEach,
    RunATest,
    RunAfterEach,
    RunAfterAll,
}

export interface IState {
    enter(): void;
    update(): void;
    exit(): void;
}