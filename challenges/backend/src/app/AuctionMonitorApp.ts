import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuctionController } from "./services/CarOnSaleClient/interface/IAuctionController";

@injectable()
export class AuctionMonitorApp {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUCTION_CONTROLLER)
        private auctionController: IAuctionController,
        @inject(DependencyIdentifier.COS_CLIENT)
        private carOnSaleClient: ICarOnSaleClient
    ) {}

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        const auctions = await this.carOnSaleClient.getRunningAuctions();

        this.auctionController.setData(auctions);
        this.logger.info(`Total auctions count: ${auctions.length}`);
        this.logger.info(
            `Average bids number: ${this.auctionController
                .getAvgBidsNum()
                .toFixed(2)}`
        );
        this.logger.info(
            `Average progress percentage: ${(
                this.auctionController.getAvgProgressPercentage() * 100
            ).toFixed(2)} %`
        );
        this.logger.info(`Auction Monitor finished.`);
    }
}
