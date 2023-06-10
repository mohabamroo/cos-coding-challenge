import { IHttpClient, HttpConfig } from "../interface/IHttpClient";
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class HttpClient implements IHttpClient {
    get(url: string, config?: HttpConfig): Promise<any> {
        return axios.get(url, config);
    }

    post(url: string, data?: any, config?: HttpConfig): Promise<any> {
        return axios.post(url, data, config);
    }

    put(url: string, data?: any, config?: HttpConfig): Promise<any> {
        return axios.put(url, data, config);
    }

    patch(url: string, data?: any, config?: HttpConfig): Promise<any> {
        return axios.patch(url, data, config);
    }

    delete(url: string, config?: HttpConfig): Promise<any> {
        return axios.delete(url, config);
    }
}
