const dotenv = require("dotenv");
dotenv.config();

export interface IConfig {
    cosCredsPassword?: string;
    cosCredsEmail?: string;
    cosAPIRoot?: string;
}

export const config: IConfig = {
    cosCredsPassword: process.env.COS_CREDS_PASSWORD,
    cosCredsEmail: process.env.COS_CREDS_EMAIL,
    cosAPIRoot: process.env.COS_API_ROOT,
};
