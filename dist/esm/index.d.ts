export interface IPaginationItem {
    type: "page" | "dots";
    pageN: number;
}
export interface IPaginationParams {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    siblingCount?: number;
}
export declare function usePagination(params: IPaginationParams): IPaginationItem[];
