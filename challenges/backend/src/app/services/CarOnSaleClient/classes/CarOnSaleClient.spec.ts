import { assert } from "chai";
import { CarOnSaleClient } from "./CarOnSaleClient";

describe("CarOnSaleClientTest Tests", () => {
    it("should return auctions list", async () => {
        const cosClient = new CarOnSaleClient();
        const result = await cosClient.getRunningAuctions();
        assert.isNotNull(result);
        assert.isArray(result);
    });
});
