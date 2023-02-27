# React pagination hook

Простой, без визуального представленя, hook usePagination.

Немного передаланный алгоритм взят отсюда [https://github.com/mayankshubham/react-pagination](https://github.com/mayankshubham/react-pagination).

Параметры стандартные:

```tsx
interface IPaginationParams {
  totalCount: number; // Общее количество записей
  pageSize: number; // Количество записей на страниу
  currentPage: number; // Текущая страница
  siblingCount?: number; // Количество соседей слева.права от активной страницы(default: 2)
}
```

Возвращает массив элементов:

```tsx
interface IPaginationItem {
  type: "page" | "dots";
  pageN: number;
}
```

У точек тоже есть номер страницы, можно их показать кликабельными.

## Install

`npm install git+https://github.com/alex461919/headless-usepagination.git`

## Example

```tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // npm install bootstrap
import { usePagination } from "headless-usepagination";

function App() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pagination = usePagination({
    totalCount: 200,
    pageSize: 10,
    siblingCount: 2,
    currentPage,
  });
  const clickHandler = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      event.preventDefault();
      const page = Number((event.target as HTMLElement).dataset.page);
      page && setCurrentPage(page);
    },
    [setCurrentPage]
  );

  return (
    <div className="container">
      <div className="row flex-column align-items-center">
        <div className="col-auto my-5">
          {pagination.length && (
            <nav aria-label="Pagination">
              <ul className="pagination" onClick={clickHandler}>
                {pagination.map((item) => {
                  return (
                    <li
                      key={item.pageN}
                      className={
                        item.pageN === currentPage
                          ? "page-item active"
                          : "page-item"
                      }
                    >
                      <a
                        className="page-link"
                        data-page={item.pageN}
                        href={"#" + item.pageN}
                      >
                        {item.type === "dots" ? "..." : item.pageN}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
        <div className="col-auto my-5 fs-1">{currentPage}</div>
      </div>
    </div>
  );
}

export default App;
```
