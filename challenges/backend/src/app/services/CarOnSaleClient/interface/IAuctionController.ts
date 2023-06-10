import { IAuction } from "./IAuction";

export interface IAuctionController {
    auctions?: IAuction[];

    /**
     * set the auctions (must be called before calling any other method)
     */
    setData: (data: IAuction[]) => void;

    /**
     * Compute average bids num of the auctions
     * @returns number: the average bids num of the auctions
     * @throws if the auctions are undefined
     */
    getAvgBidsNum: () => number;

    /**
     * Compute average progress percentage of the auctions
     * @returns number: the average progress percentage of the auctions
     * @throws if the auctions are undefined
     */
    getAvgProgressPercentage: () => number;
}
