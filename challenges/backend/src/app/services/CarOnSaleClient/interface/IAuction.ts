/**
 * An interface describing an Auction object from the CarOnSale API.
 */
export interface IAuction {
    id: number;
    label: string;
    minimumRequiredAsk: number;
    currentHighestBidValue: number;
    numBids: number;
}
