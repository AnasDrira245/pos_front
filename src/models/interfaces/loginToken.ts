import { BaseOut } from "./baseOut";

export interface LoginToken extends BaseOut {
    access_token: string;
    token_type: string;
}