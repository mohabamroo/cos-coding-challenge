import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IHttpClient } from "./services/HttpClient/interface/IHttpClient";
import { HttpClient } from "./services/HttpClient/classes/HttpClient";
import { IAuctionController } from "./services/CarOnSaleClient/interface/IAuctionController";
import { AuctionController } from "./services/CarOnSaleClient/classes/AuctionController";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container
    .bind<ICarOnSaleClient>(DependencyIdentifier.COS_CLIENT)
    .to(CarOnSaleClient);
container.bind<IHttpClient>(DependencyIdentifier.HTTP_CLIENT).to(HttpClient);
container
    .bind<IAuctionController>(DependencyIdentifier.AUCTION_CONTROLLER)
    .to(AuctionController);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
