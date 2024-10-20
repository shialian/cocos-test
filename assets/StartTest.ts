import * as cc from 'cc';
import { run } from "./Main";
import { EDITOR } from "cc/env";
const { ccclass } = cc._decorator;

@ccclass('StartTest')
export class StartTest extends cc.Component {

    onLoad() {
        // 編輯器模式下不執行
        if (EDITOR) {
            return;
        }

        run();
    }
}