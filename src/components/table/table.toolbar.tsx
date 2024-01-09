import type { TableColumn } from '@/types'

import { useMemo } from 'react'

import { useDebounce } from '../../hooks/use-debounce.ts'
import { useInput } from '../../hooks/use-input.ts'
import { useModal } from '../../hooks/use-modal.ts'

import { Input } from '../input.tsx'
import { Button } from '../button.tsx'
import { Modal } from '../modal.tsx'

import { TableSettings } from './table.settings.tsx'
import { useTableContext } from './table.context.tsx'

const TableSearch = () => {
  const { data, search, pagination } = useTableContext()
  const { value, onChange } = useInput('')
  const { debounce } = useDebounce()

  return (
    <label className="flex align-center gap-3">
      <div className="sec-text">Search:</div>

      <span className="flex">
        <Input
          disabled={!data.length}
          name="search"
          type="string"
          value={value}
          onChange={(name, value) => {
            onChange(name, value)

            debounce(() => {
              pagination.goTo(1)
              search.setSearchValue(`${value}`)
            })
          }}
        />
      </span>
    </label>
  )
}

const ColumnSelector = () => {
  const { data, columns, selectedColumns, setSelectedColumns } =
    useTableContext()

  const value = useMemo(() => {
    return selectedColumns
      .sort((a, b) => {
        return a.ordinalNo > b.ordinalNo ? 1 : -1
      })
      .map(({ title }) => title)
  }, [selectedColumns])

  const options = useMemo(() => {
    return columns.map(({ title }) => title)
  }, [columns])

  return (
    <div className="flex align-center gap-3">
      <div className="sec-text">Ⅲ Columns:</div>

      <label className="block" style={{ width: '200px' }}>
        <Input
          disabled={!data.length}
          name="column-selector"
          title="Columns"
          type="list"
          value={value}
          options={options}
          onChange={(_, _value) => {
            if (!setSelectedColumns) {
              return
            }

            const value = _value as Array<string>

            const newColumns: Array<TableColumn> = []

            columns.forEach((column) => {
              if (value.includes(column.title)) {
                newColumns.push(column)
              }
            })

            setSelectedColumns(newColumns)
          }}
          multiple
        />
      </label>
    </div>
  )
}

const GroupingSelector = () => {
  const { data, columns, group } = useTableContext()

  return (
    <div className="flex align-center gap-3 full-width">
      <div className="sec-text">⑆ Group by:</div>

      <label className="grow-1">
        <Input
          disabled={!data.length}
          name="column-selector"
          title="Group by"
          type="list"
          placeholder="---"
          value={[group.groupBy]}
          options={columns
            .filter((column) => {
              return (
                column.type !== 'list' && column.type !== 'object'
              )
            })
            .map(({ title }) => title)}
          onChange={(_, value) => {
            group.setGroupBy(`${value}`)
          }}
          className="full-width block"
        />
      </label>
    </div>
  )
}

const LastUpdated = () => {
  const { persistence } = useTableContext()

  if (!persistence.lastUpdated) {
    return '---'
  }

  return (
    <div className="flex align-center justify-between grow-1">
      <div>{persistence.lastUpdatedText}</div>

      <div className="sec-text">
        {new Date(persistence.lastUpdated).toLocaleString('en-GB')}
      </div>
    </div>
  )
}

export const TableToolbar = () => {
  const { open: settingsModalOpen, toggle: toggleSettingsModal } =
    useModal()

  const { persistence } = useTableContext()

  return (
    <>
      <div className="flex align-center justify-between">
        <div className="flex align-center gap-3">
          <div>
            <Button onClick={() => toggleSettingsModal()}>
              <div className="padding-1">☰</div>
            </Button>

            <Modal
              open={settingsModalOpen}
              toggle={toggleSettingsModal}
              position="start"
            >
              <TableSettings />
            </Modal>
          </div>

          <h1>Data Grid App</h1>
        </div>

        <div className="fb-40">
          <fieldset className="flex align-center gap-3 relative padding-3">
            {persistence.lastUpdated &&
            persistence.timeGap < 3000 ? (
              <div className="flash" />
            ) : (
              ''
            )}

            <div className="sec-text">Last updated:</div>

            <LastUpdated />
          </fieldset>
        </div>
      </div>

      <fieldset className="padding-3">
        <div className="flex justify-between">
          <div className="fb-60 flex align-center">
            <TableSearch />
          </div>

          <div className="fb-40 flex align-center justify-between gap-5">
            <ColumnSelector />

            <div className="grow-1">
              <GroupingSelector />
            </div>
          </div>
        </div>
      </fieldset>
    </>
  )
}
