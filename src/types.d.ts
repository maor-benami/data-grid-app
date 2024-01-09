import React from 'react'

export type DataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'list'
  | 'object'

export type SortDir = 'az' | 'za'

export type Theme = 'default' | 'raw'

export type DataValue = unknown

export type DataItem = {
  id: string
  [columnId: string]: unknown
}

export type TableProps = {
  data: Array<TableDataItem>
  columns: Array<TableColumn>
  settings?: TableSettingsType
}

export type TableDataItem = {
  id: string
  groupId?: string
  [columnId: string]: DataValue
}

export type TableColumn = {
  type: DataType
  ordinalNo: number
  id: string
  title: string
  width?: number
  sortable?: boolean
}

export type TableColumns = Array<TableColumn>

export type TableData = Array<TableDataItem>

export type InputProps = {
  name: string
  type: DataType
  value?: DataValue
  options?: Array<string>
  placeholder?: string
  multiple?: boolean
  checked?: boolean
  min?: number
  max?: number
  title?: string
  className?: string
  style?: Record<string, string>
  disabled?: boolean
  onChange?: (name: string, value: DataValue) => void
}

export interface OptionProps extends InputProps {
  option: string
}

export type TableSettingsType = {
  theme: {
    themes: Array<Theme>
    selected: Theme
    darkMode: boolean
  }
  data: {
    persist: boolean
  }
}

export type TablePersistence = {
  lastUpdated: number
  timeGap: number
  lastUpdatedText: string
  setLastUpdated: SetLastUpdated
  save: (data: TableData) => void
}

export type TableSort = {
  sortBy: string
  sortDir: SortDir
  setSort: (columnId: string) => void
}

export type TablePagination = {
  pageSize: number
  totalPages: number
  currentPage: number
  from: number
  to: number
  first: () => void
  prev: () => void
  next: () => void
  last: () => void
  goTo: (page: number) => void
  setPageSize: SetPageSize
}

export type TableGroup = {
  groupBy: string
  groupKeys: Array<string>
  expandedGroups: Array<string>
  setGroupBy: SetGroupBy
  setExpandedGroups: SetExpandedGroups
}

export type TableSearch = {
  searchValue: string
  setSearchValue: SetSearchValue
}

export type TableContextType = {
  columns: Array<TableColumn>
  data: Array<TableDataItem>
  settings: TableSettingsType
  selectedData: Array<TableDataItem>
  pageData: Array<TableDataItem>
  selectedColumns: Array<TableColumn>
  persistence: TablePersistence
  sort: TableSort
  pagination: TablePagination
  search: TableSearch
  group: TableGroup
  setColumns: SetColumns
  setData: SetData
  setSettings: SetSettings
  setSelectedColumns?: SetSelectedColumns
}

export type SetColumns = (columns: TableColumns) => void

export type SetPageSize = React.Dispatch<
  React.SetStateAction<number>
>

export type SetLastUpdated = React.Dispatch<
  React.SetStateAction<number>
>

export type SetSearchValue = React.Dispatch<
  React.SetStateAction<string>
>

export type SetGroupBy = React.Dispatch<
  React.SetStateAction<string>
>

export type SetExpandedGroups = React.Dispatch<
  React.SetStateAction<Array<string>>
>

export type SetSelectedColumns = React.Dispatch<
  React.SetStateAction<TableColumns>
>

export type SetData = React.Dispatch<
  React.SetStateAction<TableData>
>

export type SetSettings = React.Dispatch<
  React.SetStateAction<TableSettingsType>
>
