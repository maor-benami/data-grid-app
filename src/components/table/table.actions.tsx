import {
  clearData,
  saveColumns,
  saveData,
  saveSettings,
  seedData,
  saveLastUpdated,
} from '../../utils/storage.ts'
import { useInput } from '../../hooks/use-input.ts'

import { Input } from '../input.tsx'
import { Button } from '../button.tsx'

import { useTableContext } from './table.context.tsx'

export const ImportJson = () => {
  const {
    settings,
    setData,
    setColumns,
    setSettings,
    persistence,
  } = useTableContext()

  return (
    <div className="flex align-center justify-between gap-3">
      <div>
        Import data:
        <br />
        <div className="s-2" />
        <div style={{ width: '50rem' }} className="sec-text">
          <small>
            JSON file <u>must include</u> a <u>data</u> key and a{' '}
            <u>columns</u> key.
          </small>
        </div>
      </div>

      <div>
        <label className="relative">
          <input
            className="absolute opacity-0"
            type="file"
            accept="application/JSON"
            onChange={async (e) => {
              const reader = new FileReader()

              reader.onload = async function onReaderLoad(e) {
                try {
                  const parsed = JSON.parse(`${e.target?.result}`)
                  if (!parsed.data || !parsed.columns) {
                    confirm(
                      `The file should contain a 'data' key and a 'columns' key`,
                    )
                  } else {
                    const now = Date.now()

                    setData(parsed.data)
                    setColumns(parsed.columns)

                    if (parsed.settings) {
                      setSettings(parsed.settings)
                    }

                    if (settings.data.persist) {
                      saveData(parsed.data)
                      saveColumns(parsed.columns)
                      saveSettings(parsed.settings)
                      saveLastUpdated(now)
                    }

                    persistence.setLastUpdated(now)

                    location.reload()
                  }
                } catch (err) {
                  confirm('Error parsing json file')
                }
              }

              if (e.target.files) {
                reader.readAsText(e.target.files[0])
              }
            }}
          />
          <button>⇪ Upload JSON</button>
        </label>
      </div>
    </div>
  )
}

export const SeedData = () => {
  const { settings, setData, setColumns, persistence } =
    useTableContext()

  const { value, onChange } = useInput(2000)

  return (
    <div className="flex align-center justify-between gap-3">
      <div>Seed mock data:</div>

      <div className="flex align-center gap-1">
        <label className="flex align-center gap-3">
          <Input
            name="seed-count"
            type="number"
            min={1}
            max={10000}
            value={value}
            onChange={onChange}
            style={{ width: '20rem' }}
          />
        </label>

        <Button
          onClick={() => {
            const { data, columns } = seedData(Number(value))
            const now = Date.now()

            setData(data)
            setColumns(columns)

            if (settings.data.persist) {
              saveData(data)
              saveColumns(columns)
              saveLastUpdated(now)
            }

            persistence.setLastUpdated(now)

            location.reload()
          }}
        >
          Seed
        </Button>
      </div>
    </div>
  )
}

export const ExportData = () => {
  const { data, columns, settings } = useTableContext()

  return (
    <div className="flex align-center justify-between gap-3">
      <div>Export data:</div>
      <div>
        <Button
          disabled={!data.length}
          onClick={() => {
            const dataStr =
              'data:text/json;charset=utf-8,' +
              encodeURIComponent(
                JSON.stringify({ data, columns, settings }),
              )
            const dlAnchorElem = document.createElement('a')
            dlAnchorElem.setAttribute('href', dataStr)
            dlAnchorElem.setAttribute('download', 'data.json')
            dlAnchorElem.click()
          }}
        >
          ⇩ Download JSON
        </Button>
      </div>
    </div>
  )
}

export const ClearData = () => {
  const { data } = useTableContext()

  return (
    <div className="flex align-center justify-between gap-3">
      <div>Clear local storage:</div>
      <div>
        <Button
          disabled={!data.length}
          onClick={() => {
            clearData()

            location.reload()
          }}
        >
          Clear data
        </Button>
      </div>
    </div>
  )
}
