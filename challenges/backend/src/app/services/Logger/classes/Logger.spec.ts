import { assert } from "chai";
import sinon from "sinon";
import { Logger } from "../../Logger/classes/Logger";

describe("Logger Tests", () => {
    it("should logs a message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let spy = sinon.spy(console, "log");
        logger.log(message);
        assert(spy.calledWith(`[LOG]: ${message}`));
        spy.restore();
    });
    it("should logs an error message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let spy = sinon.spy(console, "error");
        logger.error(message);
        assert(spy.calledWith(`[ERROR]: ${message}`));
        spy.restore();
    });
    it("should logs a warning message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let spy = sinon.spy(console, "warn");
        logger.warn(message);
        assert(spy.calledWith(`[WARN]: ${message}`));
        spy.restore();
    });
    it("should logs an info message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let spy = sinon.spy(console, "info");
        logger.info(message);
        assert(spy.calledWith(`[INFO]: ${message}`));
        spy.restore();
    });
});
