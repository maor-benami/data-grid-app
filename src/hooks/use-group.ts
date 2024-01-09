import type { TableColumns, TableData } from '@/types'

import { useMemo, useState } from 'react'
import { groupBy as _groupBy } from 'lodash'

export const useGroup = (
  data: TableData,
  columns: TableColumns,
) => {
  const [groupBy, setGroupBy] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<
    Array<string>
  >([])

  const groupedData = useMemo(() => {
    if (!groupBy) {
      return {}
    }

    const column = columns.find(({ title }) => groupBy === title)

    return _groupBy(data, column?.id)
  }, [columns, groupBy, data])

  const groupKeys = useMemo(() => {
    return Object.keys(groupedData)
  }, [groupedData])

  return {
    groupBy,
    groupKeys,
    expandedGroups,
    groupedData,
    setExpandedGroups,
    setGroupBy,
  }
}
