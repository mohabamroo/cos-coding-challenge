import { assert } from "chai";
import sinon from "sinon";
import { Logger } from "../../Logger/classes/Logger";

describe("Logger Tests", () => {
    it("should logs a message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let stub = sinon.stub(console, "log");
        logger.log(message);
        assert(stub.calledWith(`[LOG]: ${message}`));
        stub.restore();
    });
    it("should logs an error message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let stub = sinon.stub(console, "error");
        logger.error(message);
        assert(stub.calledWith(`[ERROR]: ${message}`));
        stub.restore();
    });
    it("should logs a warning message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let stub = sinon.stub(console, "warn");
        logger.warn(message);
        assert(stub.calledWith(`[WARN]: ${message}`));
        stub.restore();
    });
    it("should logs an info message in console", async () => {
        const logger = new Logger();
        const message = "test";
        let stub = sinon.stub(console, "info");
        logger.info(message);
        assert(stub.calledWith(`[INFO]: ${message}`));
        stub.restore();
    });
});
