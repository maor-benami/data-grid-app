import { Table } from './components/table.tsx'

import {
  loadData,
  loadColumns,
  loadSettings,
} from './utils/storage.ts'

const App = () => {
  const data = loadData()
  const columns = loadColumns()
  const settings = loadSettings()

  return (
    <div className="flex column gap-3 full-height padding-5">
      <Table columns={columns} data={data} settings={settings} />

      <div id="modal" />
    </div>
  )
}

export default App
