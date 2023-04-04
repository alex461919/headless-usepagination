"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var react_1 = require("@testing-library/react");
function setup(params) {
    var result = (0, react_1.renderHook)(function () { return (0, _1.usePagination)(params); }).result;
    return result.current;
}
test("Active page start", function () {
    var pageItems = setup({
        totalCount: 200,
        pageSize: 10,
        currentPage: 1,
        siblingCount: 2,
    });
    expect(pageItems.length).toBe(9);
    expect(pageItems.filter(function (item) { return item.type === "dots"; }).length).toBe(1);
    expect(pageItems.flatMap(function (item) { return item.pageN; })).toEqual([
        1, 2, 3, 4, 5, 6, 7, 14, 20,
    ]);
});
test("Active page end", function () {
    var pageItems = setup({
        totalCount: 200,
        pageSize: 10,
        currentPage: 20,
        siblingCount: 2,
    });
    expect(pageItems.length).toBe(9);
    expect(pageItems.filter(function (item) { return item.type === "dots"; }).length).toBe(1);
});
test("Active page center", function () {
    var pageItems = setup({
        totalCount: 200,
        pageSize: 10,
        currentPage: 10,
        siblingCount: 2,
    });
    expect(pageItems.length).toBe(9);
    expect(pageItems.filter(function (item) { return item.type === "dots"; }).length).toBe(2);
});
test("SiblingCount 3", function () {
    var pageItems = setup({
        totalCount: 200,
        pageSize: 10,
        currentPage: 10,
        siblingCount: 3,
    });
    expect(pageItems.length).toBe(11);
    expect(pageItems.filter(function (item) { return item.type === "dots"; }).length).toBe(2);
});
test("Without dots", function () {
    var pageItems = setup({
        totalCount: 30,
        pageSize: 10,
        currentPage: 2,
        siblingCount: 2,
    });
    expect(pageItems.length).toBe(3);
    expect(pageItems.filter(function (item) { return item.type === "dots"; })).toEqual([]);
});
