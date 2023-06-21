import { AUCTIONS_NOT_FOUND } from "../../../constants";
import { IAuction } from "../interface/IAuction";
import { AuctionController } from "./AuctionController";
import { assert, expect } from "chai";

describe("AuctionController Tests", () => {
    let auctions: IAuction[] = [
        {
            id: 1,
            numBids: 1,
            currentHighestBidValue: 1,
            minimumRequiredAsk: 2,
            label: "First",
        },
        {
            id: 2,
            numBids: 3,
            currentHighestBidValue: 3,
            minimumRequiredAsk: 6,
            label: "Second",
        },
    ];

    it("should return average bids num ", async () => {
        const auctionController = new AuctionController();
        auctionController.setData(auctions);
        const avgBidsNum = auctionController.getAvgBidsNum();
        expect(avgBidsNum).to.eq(2);
    });

    it("should fail to compute average bids num ", async () => {
        assert.throws(
            function () {
                const auctionController = new AuctionController();
                auctionController.getAvgBidsNum();
            },
            Error,
            AUCTIONS_NOT_FOUND
        );
    });

    it("should return average progress percentage ", async () => {
        const auctionController = new AuctionController();
        auctionController.setData(auctions);
        const avgBidsNum = auctionController.getAvgProgressPercentage();
        expect(avgBidsNum).to.eq(0.5);
    });
});
