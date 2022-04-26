import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

const StandingsTable = ({ data = [] }) => {
  // Table stuff
  const columns = useMemo(
    () => [
      {
        Header: "P.",
        accessor: "id", // accessor is the "key" in the data
        id: "index", // accessor is the "key" in the data
      },
      {
        Header: "Team",
        accessor: "name", // accessor is the "key" in the data
        id: "name", // accessor is the "key" in the data
      },
      {
        Header: "Points",
        accessor: "points", // accessor is the "key" in the data
        id: "points", // accessor is the "key" in the data
      },
    ],
    []
  );
  const memoizedData = useMemo(() => {
    return data.map((data, index) => {
      return { ...data, id: index + 1 };
    });
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: memoizedData,
      },
      useSortBy
    );

  const placementIndicator = (index) => {
    if (index === 0) return "border-l-4 border-firstPlace";
    if (index === 1) return "border-l-4 border-secondPlace";
    if (index === 2) return "border-l-4 border-thirdPlace";
    return "";
  };

  // Render the UI for your table
  return (
    <div className="pb-2 w-full rounded-md">
      <table
        className="text-whites-light text-xs text-center align-middle w-full shadow-lg bg-dark-backgroundDark"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-center w-full font-bold bg-dark-backgroundDarker"
            >
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2"
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`${i % 2 ? "" : "bg-dark-background"} `}
              >
                {row.cells.map((cell) => {
                  if (cell.column.id === "index")
                    return (
                      <td
                        className={`text-center text-2xs py-1.5 px-1 relative`}
                        {...cell.getCellProps()}
                      >
                        <div
                          className={`w-full h-full ${placementIndicator(i)}`}
                        >
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  if (cell.column.Header === "Team")
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="py-1.5 px-2.5 text-left"
                      >
                        {cell.render("Cell")}
                      </td>
                    );

                  return (
                    <td {...cell.getCellProps()} className="py-1.5">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
