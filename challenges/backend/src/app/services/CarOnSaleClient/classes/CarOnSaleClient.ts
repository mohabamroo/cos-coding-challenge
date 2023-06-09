import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor() {}

    public getRunningAuctions(): Promise<any> {
        // TODO: Implement this method
        return Promise.resolve([]);
    }
}
