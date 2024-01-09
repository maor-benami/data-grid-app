import type { TableProps } from '@/types'

import React from 'react'

import { useTable } from '../hooks/use-table.ts'

import { TableContext } from './table/table.context.tsx'
import { TableMain } from './table/table.main.tsx'

export const Table: React.FC<TableProps> = (props) => {
  const tableContextValue = useTable({
    data: props.data,
    columns: props.columns,
    settings: props.settings,
  })

  return (
    <TableContext.Provider value={tableContextValue}>
      <TableMain />
    </TableContext.Provider>
  )
}
