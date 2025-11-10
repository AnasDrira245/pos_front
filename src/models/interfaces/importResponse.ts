import { BaseOut } from "./baseOut";
import { MatchyWrongCell } from "./matchyWrongCell";

export interface ImportResponse extends BaseOut {
    errors?: string
    warnings?: string
    wrong_cells?: MatchyWrongCell[];
}