import Runnable from "./Runnable";
import { TestFunction } from "../Configuration/TestConfig";

export default class Test extends Runnable {
    public constructor(title: string, fn: TestFunction) {
        super(title, fn);
    }
}