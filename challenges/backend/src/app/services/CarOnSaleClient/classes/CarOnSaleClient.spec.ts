import { assert } from "chai";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { IHttpClient } from "../../HttpClient/interface/IHttpClient";
import { expect } from "chai";
import sinon, { SinonStubbedInstance } from "sinon";
import { ILogger } from "../../Logger/interface/ILogger";
import {
    ICarOnSaleAuthError,
    ICarOnSaleClient,
    ICarOnSaleError,
} from "../interface/ICarOnSaleClient";
import {
    COST_AUTH_FAIL_MESSAGE,
    COST_LISTING_FAIL_MESSAGE,
} from "../../../constants";

describe("CarOnSaleClientTest Tests", () => {
    let carOnSaleClient: ICarOnSaleClient;
    let httpClientStub: SinonStubbedInstance<IHttpClient>;
    let loggerStub: SinonStubbedInstance<ILogger>;

    before(() => {});

    beforeEach(() => {
        const httpClient: IHttpClient = {
            get: async (_url, _config) =>
                Promise.resolve({
                    data: {},
                }),
            post: async (_url, _data, _config) => Promise.resolve({ data: {} }),
            put: async (_url, _data, _config) =>
                Promise.resolve({
                    data: {},
                }),
            patch: async (_url, _data, _config) =>
                Promise.resolve({ data: [] }),
            delete: async (_url, _config) => Promise.resolve({ data: [] }),
        };

        const logger: ILogger = {
            info: () => {},
            error: () => {},
            warn: () => {},
            log: () => {},
        };
        httpClientStub = sinon.stub(httpClient);
        loggerStub = sinon.stub(logger);
        carOnSaleClient = new CarOnSaleClient(httpClientStub, loggerStub);
    });

    it("should authenticate client", async () => {
        httpClientStub.put.returns(
            Promise.resolve({
                data: {
                    token: "token",
                    userId: "userId",
                },
            })
        );
        await carOnSaleClient.authenticate();
        assert.isNotNull(carOnSaleClient.token);
        assert.isNotNull(carOnSaleClient.userId);
    });

    it("should failed to authenticate client", async () => {
        httpClientStub.put.returns(
            Promise.reject({
                status: 401,
                data: {
                    message: "Wrong credentials",
                },
            })
        );

        try {
            await carOnSaleClient.authenticate();
        } catch (err: any) {
            assert.equal(err.message, COST_AUTH_FAIL_MESSAGE);
            expect(err).to.be.an.instanceof(ICarOnSaleAuthError);
        }
    });

    it("should return auctions list", async () => {
        httpClientStub.get.returns(Promise.resolve({ data: { items: [] } }));
        httpClientStub.put.returns(
            Promise.resolve({
                data: {
                    token: "token",
                    userId: "userId",
                },
            })
        );
        const result = await carOnSaleClient.getRunningAuctions();
        assert.isNotNull(result);
        assert.isArray(result);
        assert.equal(result.length, 0);
        expect(httpClientStub.get.calledOnce).to.be.true;
        expect(httpClientStub.put.calledOnce).to.be.true;
    });

    it("should fail to list auctions due to authentication step", async () => {
        httpClientStub.put.returns(
            Promise.resolve({
                data: {},
            })
        );
        try {
            await carOnSaleClient.getRunningAuctions();
        } catch (err: any) {
            assert.equal(err.message, COST_AUTH_FAIL_MESSAGE);
            expect(err).to.be.an.instanceof(ICarOnSaleAuthError);
        }
    });

    it("should fail in listing auctions", async () => {
        httpClientStub.get.returns(
            Promise.reject({ data: { message: "Failed to fetch auctions" } })
        );
        httpClientStub.put.returns(
            Promise.resolve({
                data: { token: "token", userId: "userId" },
            })
        );
        try {
            await carOnSaleClient.getRunningAuctions();
        } catch (err: any) {
            assert.equal(err.message, COST_LISTING_FAIL_MESSAGE);
            expect(err).to.be.an.instanceof(ICarOnSaleError);
        }
    });
});
