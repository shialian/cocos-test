import { expect } from "chai";
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from "./Main";
import { v2, Vec2 } from "cc";

const testVar: Vec2 = v2(1, 2);

describe("Base tests", () => {
    it("Should pass", () => {
        expect(testVar.x).to.equal(1);
    });

    it("Should fail", () => {
        expect(testVar.y).to.equal(3);
    });
});

describe("Hook tests", () => {
    beforeAll("Before all", () => {
        console.log("Before all");
    });

    afterAll("After all", () => {
        console.log("After all");
    });

    beforeEach("Before each", () => {
        console.log("Before each");
    });

    afterEach("After each", () => {
        console.log("After each");
    });

    it("Should pass 1", () => {
        expect(testVar.x).to.equal(1);
    });

    it("Should pass 2", () => {
        expect(testVar.y).to.equal(2);
    });
});

describe("Wrong Nesting", () => {
    it("Should throw a error", () => {
        expect(() => {
            describe("Should fail", () => {
                it("Should pass", () => {
                    expect(testVar.x).to.equal(3);
                });
            });
        }).to.throw("Cannot have a describe block inside a test block");
    });
});

describe("Async tests", () => {
    it("Should pass", async (done) => {
        setTimeout(() => {
            expect(testVar.x).to.equal(1);
            done();
        }, 1000);
    });
});

describe("Async hook tests", () => {
    beforeAll("Before all async", async (done) => {
        setTimeout(() => {
            console.log("Before all");
            done();
        }, 1000);
    });

    afterAll("After all async", async (done) => {
        setTimeout(() => {
            console.log("After all");
            done();
        }, 1000);
    });

    beforeEach("Before each async", async (done) => {
        setTimeout(() => {
            console.log("Before each");
            done();
        }, 1000);
    });

    afterEach("After each async", async (done) => {
        setTimeout(() => {
            console.log("After each");
            done();
        }, 1000);
    });

    it("Should pass 1", async (done) => {
        setTimeout(() => {
            expect(testVar.x).to.equal(1);
            done();
        }, 1000);
    });

    it("Should pass 2", async (done) => {
        setTimeout(() => {
            expect(testVar.y).to.equal(2);
            done();
        }, 1000);
    });
});

describe("Time limit tests", () => {
    let i: number = 0;

    beforeAll("2 sec to be 1 and 3 sec to be 2", () => {
        i = 0;
        setTimeout(() => {
            i = 1;
        }, 2000);

        setTimeout(() => {
            i = 2;
        }, 3000);
    });

    it("Should pass", () => {
        expect(i).to.equal(1);
    }).timeLimit(2100);

    it("Should fail", () => {
        expect(i).to.equal(2);
    }).timeLimit(500);
});