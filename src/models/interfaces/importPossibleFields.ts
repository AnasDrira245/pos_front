import { Option } from "src/libs/matchy/src/models/classes/option";
import { BaseOut } from "./baseOut";

export interface ImportPossibleFields extends BaseOut {
    possible_fields: Option[];
}