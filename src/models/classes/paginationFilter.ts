export class PaginationFilter {
    page_size: number
    page_number: number

    constructor(page_number: number = 1, page_size: number = 10) {
        this.page_number = page_number;
        this.page_size = page_size;
    }
}