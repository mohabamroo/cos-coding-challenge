import { IAuction } from "./IAuction";

export class ICarOnSaleError extends Error {}
export class ICarOnSaleAuthError extends ICarOnSaleError {}

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
    /**
     * The authentication token for the client. Optional, as some endpoints may not require authentication.
     */
    token?: string;

    /**
     * The user ID associated with the client. Optional, as some endpoints may not require user identification.
     */
    userId?: string;

    /**
     * The base URL for the CarOnSale API.
     */
    baseUrl: string;

    /**
     * Authenticates the client with the CarOnSale API.
     * @returns None, as the authentication token and user ID are stored in the client.
     * @throws An error if the client could not be authenticated.
     * @remarks This method should be called before any other method that requires authentication.
     * @example
     * ```
     * await authenticate();
     * ```
     * @example
     * ```
     * try {
     *    await authenticate();
     * } catch (error) {
     *   console.error(error);
     * }
     * ```
     */

    authenticate(): Promise<void>;

    /**
     * Checks whether the client is authenticated.
     * @returns A boolean value indicating whether the client is authenticated.
     */
    isAuthenticated?(): boolean;

    /**
     * Retrieves a list of running auctions from the CarOnSale API.
     * @returns A Promise that resolves with the list of running auctions.
     * @remarks This method should be called only if the client is authenticated.
     */
    getRunningAuctions(): Promise<IAuction[]>;
}
