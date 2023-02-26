"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
var react_1 = __importDefault(require("react"));
var dots = function (left, right) {
    return {
        type: "dots",
        pageN: left + Math.round((right - left) / 2),
    };
};
var range = function (start, end) {
    var length = end - start + 1;
    return Array.from({ length: length }, function (_, idx) { return page(idx + start); });
};
var page = function (n) { return ({ type: "page", pageN: n }); };
function usePagination(params) {
    var totalCount = params.totalCount, pageSize = params.pageSize, _a = params.siblingCount, siblingCount = _a === void 0 ? 2 : _a, currentPage = params.currentPage;
    var paginationRange = react_1.default.useMemo(function () {
        var totalPageCount = Math.ceil(totalCount / pageSize);
        if (totalPageCount < 2)
            return [];
        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        var totalPageNumbers = siblingCount + 5;
        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        var leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        var rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        /*
          We do not want to show dots if there is only one position left
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        var shouldShowLeftDots = leftSiblingIndex > 2;
        var shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        var firstPageIndex = 1;
        var lastPageIndex = totalPageCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            var leftItemCount = 3 + 2 * siblingCount;
            var leftRange = range(1, leftItemCount);
            return __spreadArray(__spreadArray([], leftRange, true), [
                dots(leftItemCount, totalPageCount),
                page(totalPageCount),
            ], false);
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            var rightItemCount = 3 + 2 * siblingCount;
            var leftIndex = totalPageCount - rightItemCount + 1;
            var rightRange = range(leftIndex, totalPageCount);
            return __spreadArray([
                page(firstPageIndex),
                dots(firstPageIndex, leftIndex)
            ], rightRange, true);
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            var middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return __spreadArray(__spreadArray([
                page(firstPageIndex),
                dots(firstPageIndex, leftSiblingIndex)
            ], middleRange, true), [
                dots(rightSiblingIndex, lastPageIndex),
                page(lastPageIndex),
            ], false);
        }
        return [];
    }, [totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
}
exports.usePagination = usePagination;
