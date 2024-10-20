import Suite from "../Unit/Suite";

export default class Context {
    public static isRunning: boolean = false;
    public static rootSuite: Suite = null;
    public static currentSuite: Suite = null;
}