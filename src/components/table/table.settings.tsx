import type { TableSettingsType } from '@/types.d.ts'

import { Input } from '../../components/input.tsx'

import { saveSettings } from '../../utils/storage.ts'

import {
  ImportJson,
  SeedData,
  ExportData,
  ClearData,
} from './table.actions.tsx'
import { useTableContext } from './table.context.tsx'

export const TableSettings = () => {
  const { settings, setSettings } = useTableContext()

  const setSetting = (
    key: string,
    subKey: string,
    value: unknown,
  ) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [key]: {
          ...settings[key as keyof TableSettingsType],
          [subKey]: value,
        },
      }

      saveSettings(newSettings)

      return newSettings
    })
  }

  return (
    <>
      <h2>Settings</h2>

      <br />

      <hr />

      <br />

      <fieldset className="padding-5">
        <legend>
          <h3>Theme</h3>
        </legend>

        <div className="flex column separator separator-2">
          <div className="flex align-center justify-between gap-3">
            <div>Selected theme:</div>

            <div>
              <Input
                name="theme-select"
                type="list"
                value={settings.theme.selected}
                options={settings.theme.themes}
                onChange={(_, value) => {
                  setSetting('theme', 'selected', value)
                }}
              />
            </div>
          </div>

          <div className="flex align-center justify-between gap-3">
            <div>Dark mode:</div>
            <div>
              <Input
                name="theme-dark-mode"
                type="boolean"
                checked={settings.theme.darkMode}
                onChange={() => {
                  setSetting(
                    'theme',
                    'darkMode',
                    !settings.theme.darkMode,
                  )
                }}
              />
            </div>
          </div>
        </div>
      </fieldset>

      <br />

      <fieldset className="padding-5">
        <legend>
          <h3>Data</h3>
        </legend>

        <div className="flex column separator separator-2">
          <div className="flex align-center justify-between gap-3">
            <div>
              Persist to local storage:
              <br />
              <div className="s-2" />
              <div style={{ width: '50rem' }} className="sec-text">
                <small>
                  <i>Data</i>, <i>Columns</i> and <i>Settings</i>{' '}
                  will be saved
                </small>
              </div>
            </div>
            <div>
              <Input
                name="data-persist"
                type="boolean"
                checked={settings.data.persist}
                onChange={() => {
                  setSetting(
                    'data',
                    'persist',
                    !settings.data.persist,
                  )
                }}
              />
            </div>
          </div>

          <SeedData />

          <ImportJson />

          <ExportData />

          <ClearData />
        </div>
      </fieldset>
    </>
  )
}
