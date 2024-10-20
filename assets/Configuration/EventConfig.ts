export namespace Event {
    export enum Test {
        RunTest = "RunTest",
        RerunningTest = "RerunningTest",
        RerunTestFinished = "RerunTestFinished",
        OnSuiteFinished = "OnSuiteFinished",
        OnTestPass = "OnTestPass",
        OnTestFailed = "OnTestFailed",
    }
}