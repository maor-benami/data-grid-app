import { useTableContext } from './table.context.tsx'
import { ImportJson, SeedData } from './table.actions.tsx'
import { TableToolbar } from './table.toolbar.tsx'
import { TableHeader } from './table.header.tsx'
import { TableBody } from './table.body.tsx'
import { TableFooter } from './table.footer.tsx'

export const TableMain = () => {
  const { data } = useTableContext()

  return (
    <>
      <TableToolbar />

      {data.length ? (
        <fieldset className="table-c relative">
          <table>
            <TableHeader />

            <TableBody />

            <TableFooter />
          </table>
        </fieldset>
      ) : (
        <fieldset
          className="padding-5 fixed bottom-50 right-50 translate-x-y-50"
          style={{ width: '120rem' }}
        >
          <div>
            <h2>No Data</h2>
            <div className="s-1" />
            <p>Feed the table with data</p>

            <br />
            <br />

            <div className="flex column separator separator-2">
              <SeedData />

              <ImportJson />
            </div>
          </div>
        </fieldset>
      )}
    </>
  )
}
