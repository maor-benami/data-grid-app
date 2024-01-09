import type { TableContextType } from '@/types'

import { createContext, useContext } from 'react'

export const useTableContext = () => {
  return useContext(TableContext)
}

// @ts-expect-error satisfy typescript
export const TableContext = createContext<TableContextType>({})
