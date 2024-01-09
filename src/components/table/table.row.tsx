import type { TableColumn, TableDataItem } from '@/types'

import React, { useState, useMemo } from 'react'
import clsx from 'clsx'

import { Highlight } from '../highlight.tsx'
import { Button } from '../button.tsx'
import { Input } from '../input.tsx'

import { useTableContext } from './table.context.tsx'

const TableCell: React.FC<{
  item: TableDataItem
  column: TableColumn
}> = (props) => {
  const value = props.item[props.column.id]
  const arrayValue = value as Array<string>

  const { search, group, persistence, setData } = useTableContext()
  const [hover, setHover] = useState(false)

  return (
    <td
      className={clsx(
        props.column.title === group.groupBy &&
          props.item.id.startsWith('g_') &&
          'active',
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative ellipsis">
        {(() => {
          if (value === undefined) {
            return
          }

          switch (props.column.type) {
            case 'boolean':
              return (
                <Input
                  disabled
                  name={props.item.id}
                  type={props.column.type}
                  value={`${value}`}
                  checked={
                    typeof value === 'boolean'
                      ? value
                      : `${value}`.startsWith('[true]')
                  }
                />
              )

            case 'list':
              return (
                <div
                  className="flex td-text"
                  style={{ border: '1px solid transparent' }}
                >
                  {arrayValue.map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        <Highlight
                          term={search.searchValue}
                          text={`${item}`}
                        />
                        {i !== arrayValue.length - 1 && (
                          <span>,&nbsp;</span>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              )

            case 'object':
              return (
                <div
                  className="flex td-text"
                  style={{ border: '1px solid transparent' }}
                >
                  <Highlight
                    term={search.searchValue}
                    text={JSON.stringify(value)}
                  />
                </div>
              )

            default:
              return (
                <div className="td-text">
                  <Highlight
                    term={search.searchValue}
                    text={`${value}`}
                  />
                </div>
              )
          }
        })()}

        {hover && props.column.title !== group.groupBy && (
          <div className="absolute inset-0">
            <div className="flex inline">
              <Input
                title={props.column.title}
                name={props.item.id}
                type={props.column.type}
                value={value}
                checked={!!value}
                onChange={(_, value) => {
                  setData((prev) => {
                    const item = prev.find(
                      (item) => item.id === props.item.id,
                    )

                    if (item) {
                      item[props.column.id] = value
                    }

                    const newData = [...prev]

                    persistence.save(newData)

                    return newData
                  })
                }}
                className="full-width"
                multiple
              />
            </div>
          </div>
        )}
      </div>
    </td>
  )
}

export const TableRow: React.FC<{
  item: TableDataItem
}> = (props) => {
  const { selectedColumns, group } = useTableContext()

  const hidden = useMemo(() => {
    return group.groupBy
      ? props.item.id.startsWith('g_')
        ? false
        : !group.expandedGroups.includes(`${props.item.groupId}`)
      : false
  }, [
    group.groupBy,
    group.expandedGroups,
    props.item.id,
    props.item.groupId,
  ])

  return (
    <tr className={clsx(hidden && 'hidden')}>
      <td>
        {group.groupBy && props.item.id.startsWith('g_') && (
          <Button
            className="expand-btn"
            onClick={() => {
              group.setExpandedGroups((prev) => {
                if (prev.includes(props.item.id)) {
                  return prev.filter((id) => id !== props.item.id)
                } else {
                  return [...prev, props.item.id]
                }
              })
            }}
          >
            <div style={{ width: '4rem', padding: '.25rem' }}>
              <small className="block">
                {group.expandedGroups.includes(props.item.id)
                  ? ' - '
                  : ' + '}
              </small>
            </div>
          </Button>
        )}
      </td>

      {selectedColumns.map((column) => {
        return (
          <TableCell
            key={column.id}
            item={props.item}
            column={column}
          />
        )
      })}

      <td />
    </tr>
  )
}
