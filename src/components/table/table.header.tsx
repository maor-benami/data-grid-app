import type { TableColumn } from '@/types'

import React from 'react'
import clsx from 'clsx'

import { useTableContext } from './table.context.tsx'

const TableHeaderCell: React.FC<{ column: TableColumn }> = (
  props,
) => {
  const { group, sort } = useTableContext()

  return (
    <th
      key={props.column.id}
      className={clsx(
        group.groupBy === props.column.title && 'active',
      )}
      style={
        props.column.width
          ? { width: `${props.column.width}px` }
          : {}
      }
    >
      <button
        className="padding-1 border-transparent"
        onClick={() => sort.setSort(props.column.id)}
      >
        <div
          className={clsx(
            'flex align-center gap-3',
            sort.sortBy !== props.column.id && 'sec-text',
          )}
        >
          <div>{props.column.title}</div>

          {sort.sortBy === props.column.id ? (
            <small>{sort.sortDir === 'az' ? '▼' : '▲'}</small>
          ) : (
            <small className="sub-text">▼</small>
          )}
        </div>
      </button>
    </th>
  )
}

export const TableHeader = () => {
  const { selectedColumns } = useTableContext()

  return (
    <thead>
      <tr>
        <th style={{ width: '5rem' }}></th>

        {selectedColumns.map((column) => {
          return (
            <TableHeaderCell key={column.id} column={column} />
          )
        })}

        <th style={{ width: '5rem' }}></th>
      </tr>
    </thead>
  )
}
