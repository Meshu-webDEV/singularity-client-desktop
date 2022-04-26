import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import FastInput from '../forms/FastInput';

const RoundsTable = ({ data = [], type = 'display' }) => {
  //

  // Table stuff
  const columns = useMemo(
    () => [
      {
        Header: 'Team',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Kills',
        accessor: 'kills', // accessor is the "key" in the data
        id: 'kills', // accessor is the "key" in the data
      },
      {
        Header: 'Placement',
        accessor: 'placement', // accessor is the "key" in the data
        id: 'placement', // accessor is the "key" in the data
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // Render the UI for your table

  if (type === 'display')
    return (
      <div className='pb-2 w-full rounded-md'>
        <table
          className='text-whites-light text-xs text-center align-middle w-full shadow-lg bg-dark-backgroundDark'
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='text-center w-full font-bold bg-dark-backgroundDarker'
              >
                {headerGroup.headers.map(column => {
                  if (column.Header === 'Team')
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className='py-1 w-1/2 flex justify-center items-center space-x-5'
                      >
                        {column.render('Header')}
                      </th>
                    );

                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className='py-1'
                    >
                      {column.render('Header')}
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
                  className={`${i % 2 ? '' : 'bg-dark-background'} `}
                >
                  {row.cells.map(cell => {
                    if (cell.column.Header === 'Team')
                      return (
                        <td
                          {...cell.getCellProps()}
                          className='py-2 px-2.5 text-left'
                        >
                          {cell.render('Cell')}
                        </td>
                      );

                    return (
                      <td {...cell.getCellProps()} className='py-1.5'>
                        {cell.render('Cell')}
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

  if (type === 'input')
    return (
      <div className='pb-2 w-full rounded-md'>
        <table
          className='text-whites-light text-xs text-center align-middle w-full shadow-lg bg-blacks-light'
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='text-center w-full font-bold bg-dark-backgroundDarker'
              >
                {headerGroup.headers.map(column => {
                  if (column.Header === 'Team')
                    return (
                      <th
                        {...column.getHeaderProps()}
                        className='py-1 w-1/2 flex justify-center items-center space-x-5'
                      >
                        {column.render('Header')}
                      </th>
                    );

                  return (
                    <th {...column.getHeaderProps()} className='py-1'>
                      {column.render('Header')}
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
                  className={`${i % 2 ? '' : 'bg-dark-backgroundDark'} `}
                >
                  {row.cells.map(cell => {
                    if (cell.column.Header === 'Team')
                      return (
                        <td
                          {...cell.getCellProps()}
                          className='py-2 px-2.5 text-left'
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    if (cell.column.Header === 'Kills')
                      return (
                        <td
                          {...cell.getCellProps()}
                          className='py-2 px-2.5 text-left'
                        >
                          <FastInput
                            min={0}
                            max={57}
                            noLabel
                            type='number'
                            size='tiny'
                            name={`roundPoints.table[${i}].kills`}
                          />
                        </td>
                      );

                    return (
                      <td {...cell.getCellProps()} className='py-1.5'>
                        <FastInput
                          min={1}
                          max={20}
                          noLabel
                          type='number'
                          size='tiny'
                          name={`roundPoints.table[${i}].placement`}
                        />
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

export default RoundsTable;
