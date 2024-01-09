import type {
  TableColumns,
  TableData,
  TableDataItem,
  TableSettingsType,
} from '@/types'

import { useMemo, useState, useEffect, useCallback } from 'react'

import { usePersistence } from './use-persistence.ts'
import { useSort } from './use-sort.ts'
import { useSearch } from './use-search.ts'
import { useGroup } from './use-group.ts'
import { usePagination } from './use-pagination.ts'

const defaultSettings: TableSettingsType = {
  theme: {
    themes: ['default', 'raw'],
    selected: 'default',
    darkMode: true,
  },
  data: {
    persist: true,
  },
}

export const useTable = (props: {
  columns: TableColumns
  data: TableData
  settings?: TableSettingsType
}) => {
  const [columns, _setColumns] = useState(props.columns)
  const [data, setData] = useState(props.data)
  const [settings, setSettings] = useState(
    Object.assign(defaultSettings, props.settings || {}),
  )
  const [selectedColumns, setSelectedColumns] = useState(
    props.columns,
  )

  const sort = useSort()
  const search = useSearch()

  const selectedData = useMemo(() => {
    let selectedData: Array<TableDataItem> = []

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      if (search.searchValue) {
        const _item: Record<string, unknown> = { ...item }
        delete _item.id

        if (
          JSON.stringify(_item)
            .toLowerCase()
            .indexOf(search.searchValue.toLowerCase()) > -1
        ) {
          selectedData.push(item)
        }
      } else {
        selectedData.push(item)
      }
    }

    selectedData = selectedData.sort((a, b) => {
      const sortOrder = sort.sortDir === 'za' ? 1 : -1

      return (a[sort.sortBy] as number) >
      (b[sort.sortBy] as number)
        ? sortOrder
        : -sortOrder
    })

    return selectedData
  }, [data, search.searchValue, sort.sortBy, sort.sortDir])

  const pagination = usePagination(selectedData)
  const group = useGroup(selectedData, props.columns)

  const pageData = useMemo(() => {
    const start =
      (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize

    if (group.groupBy) {
      const perGroup = Math.floor(
        pagination.pageSize / group.groupKeys.length,
      )

      let result: TableData = []

      group.groupKeys.map((key, i) => {
        const column = props.columns.find(
          ({ title }) => title === group.groupBy,
        )

        if (column) {
          const groupId = `g_${i}`
          const groupItems = group.groupedData[key].map((item) => {
            item.groupId = groupId
            return item
          })

          result = [
            ...result,
            {
              id: groupId,
              [column.id]: `[${key}] (${groupItems.length})`,
            },
            ...perGroup === 0 ? groupItems : groupItems
              .slice(
                perGroup * (pagination.currentPage - 1),
                perGroup * (pagination.currentPage - 1) +
                perGroup +
                (i === group.groupKeys.length - 1
                  ? pagination.pageSize %
                  group.groupKeys.length
                  : 0),
              ),
          ]
        }
      })

      return result
    } else {
      return selectedData.slice(start, end)
    }
  }, [
    selectedData,
    pagination.currentPage,
    pagination.pageSize,
    group.groupedData,
    group.groupKeys,
    group.groupBy,
    props.columns,
  ])

  const persistence = usePersistence()

  const setColumns = useCallback((columns: TableColumns) => {
    _setColumns(columns)
    setSelectedColumns(columns)
  }, [])

  useEffect(() => {
    document.body.className = ''

    if (settings.theme.darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }

    document.body.classList.add(settings.theme.selected)
  }, [settings.theme.darkMode, settings.theme.selected])

  return {
    columns,
    data,
    settings,
    search,
    sort,
    persistence,
    pagination,
    group,
    selectedColumns,
    selectedData,
    pageData,
    setData,
    setColumns,
    setSettings,
    setSelectedColumns,
  }
}
