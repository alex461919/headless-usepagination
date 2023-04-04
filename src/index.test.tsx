import { IPaginationParams, usePagination } from ".";
import { renderHook } from "@testing-library/react";

function setup(params: IPaginationParams) {
  const { result } = renderHook(() => usePagination(params));
  return result.current;
}

test("Active page start", () => {
  const pageItems = setup({
    totalCount: 200,
    pageSize: 10,
    currentPage: 1,
    siblingCount: 2,
  });
  expect(pageItems.length).toBe(9);
  expect(pageItems.filter((item) => item.type === "dots").length).toBe(1);
  expect(pageItems.flatMap((item) => item.pageN)).toEqual([
    1, 2, 3, 4, 5, 6, 7, 14, 20,
  ]);
});
test("Active page end", () => {
  const pageItems = setup({
    totalCount: 200,
    pageSize: 10,
    currentPage: 20,
    siblingCount: 2,
  });
  expect(pageItems.length).toBe(9);
  expect(pageItems.filter((item) => item.type === "dots").length).toBe(1);
});
test("Active page center", () => {
  const pageItems = setup({
    totalCount: 200,
    pageSize: 10,
    currentPage: 10,
    siblingCount: 2,
  });
  expect(pageItems.length).toBe(9);
  expect(pageItems.filter((item) => item.type === "dots").length).toBe(2);
});
test("SiblingCount 3", () => {
  const pageItems = setup({
    totalCount: 200,
    pageSize: 10,
    currentPage: 10,
    siblingCount: 3,
  });
  expect(pageItems.length).toBe(11);
  expect(pageItems.filter((item) => item.type === "dots").length).toBe(2);
});
test("Without dots", () => {
  const pageItems = setup({
    totalCount: 30,
    pageSize: 10,
    currentPage: 2,
    siblingCount: 2,
  });
  expect(pageItems.length).toBe(3);
  expect(pageItems.filter((item) => item.type === "dots")).toEqual([]);
});
