import { BaseOut } from "./baseOut";

export interface ListResponse<T> extends BaseOut {
    list: T[];
}