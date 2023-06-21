import "reflect-metadata";
import { IAuction } from "../interface/IAuction";

import { IAuctionController } from "../interface/IAuctionController";
import { injectable } from "inversify";
import { AUCTIONS_NOT_FOUND } from "../../../constants";
import { calculateAverage } from "../../../helpers/array-helper";

@injectable()
export class AuctionController implements IAuctionController {
    auctions?: IAuction[];

    public constructor() {}

    public setData(data: IAuction[]): void {
        this.auctions = data;
    }

    public getAvgBidsNum(): number {
        if (!this.auctions) throw new Error(AUCTIONS_NOT_FOUND);
        return calculateAverage(this.auctions.map((x) => x.numBids));
    }

    public getAvgProgressPercentage(): number {
        if (!this.auctions) throw new Error(AUCTIONS_NOT_FOUND);

        const progressRatios = this.auctions
            .filter(
                (auction) =>
                    auction.minimumRequiredAsk && auction.currentHighestBidValue
            )
            .map(
                (auction) =>
                    <number>auction.currentHighestBidValue /
                    <number>auction.minimumRequiredAsk
            );

        return calculateAverage(progressRatios);
    }
}
