import {
    ICarOnSaleAuthError,
    ICarOnSaleClient,
    ICarOnSaleError,
} from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import {
    IHttpClient,
    IHttpError,
} from "../../HttpClient/interface/IHttpClient";
import { ILogger } from "../../Logger/interface/ILogger";
import { IAuction } from "../interface/IAuction";
import {
    COS_API_ROOT,
    COST_AUTH_FAIL_MESSAGE,
    COST_LISTING_FAIL_MESSAGE,
} from "../../../constants";
import { config } from "../../../config";
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    baseUrl: string = COS_API_ROOT;
    token?: string;
    userId?: string;

    public constructor(
        @inject(DependencyIdentifier.HTTP_CLIENT)
        private httpClient: IHttpClient,
        @inject(DependencyIdentifier.LOGGER)
        private logger: ILogger
    ) {}

    public async authenticate(): Promise<void> {
        this.logger.info("Authenticating with CarOnSale API...");
        try {
            const response = await this.httpClient.put(
                `${this.baseUrl}/v1/authentication/${config.cosCredsEmail}`,
                {
                    password: config.cosCredsPassword,
                }
            );

            const { token, userId } = response.data;
            if (!token || !userId)
                throw new ICarOnSaleAuthError(COST_AUTH_FAIL_MESSAGE);
            this.token = token;
            this.userId = userId;
        } catch (err) {
            throw new ICarOnSaleAuthError(COST_AUTH_FAIL_MESSAGE);
        }
    }

    public isAuthenticated(): boolean {
        return !!this.token && !!this.userId;
    }

    public async getRunningAuctions(): Promise<IAuction[]> {
        if (!this.isAuthenticated()) await this.authenticate();

        try {
            const response = await this.httpClient.get(
                `${this.baseUrl}/v2/auction/buyer/`,
                {
                    headers: {
                        authtoken: <string>this.token,
                        userid: <string>this.userId,
                    },
                }
            );
            const items = <IAuction[]>response.data.items;
            return Promise.resolve(items);
        } catch (err) {
            if ((<IHttpError>err).status === 401)
                throw new ICarOnSaleAuthError(COST_AUTH_FAIL_MESSAGE);

            throw new ICarOnSaleError(COST_LISTING_FAIL_MESSAGE);
        }
    }
}
