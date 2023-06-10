export interface HttpConfig {
    headers?: { [key: string]: string };
    params?: { [key: string]: string };
    timeout?: number;
}

export interface IHttpError {
    message?: string;
    status?: number;
    response?: any;
}
export interface IHttpClient {
    get(url: string, config?: HttpConfig): Promise<any>;
    post(url: string, data?: any, config?: HttpConfig): Promise<any>;
    put(url: string, data?: any, config?: HttpConfig): Promise<any>;
    patch(url: string, data?: any, config?: HttpConfig): Promise<any>;
    delete(url: string, config?: HttpConfig): Promise<any>;
}
