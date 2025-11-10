import { Cell } from "src/libs/matchy/src/models/classes/cell";
import { UploadEntry } from "src/libs/matchy/src/models/classes/uploadEntry";

export class MatchyUploadEntry extends UploadEntry {
    forceUpload: boolean = false;

    constructor(lines: {[key: string]: Cell;} [], forceUpload: boolean) {
        super(lines);
        this.forceUpload = forceUpload;
    }
}