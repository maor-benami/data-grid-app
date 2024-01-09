import { TableRow } from './table.row.tsx'
import { useTableContext } from './table.context.tsx'

export const TableBody = () => {
  const { pageData, selectedColumns } = useTableContext()

  return (
    <tbody>
      {selectedColumns.length ? (
        pageData.map((item) => {
          return <TableRow key={item.id} item={item} />
        })
      ) : (
        <tr>
          <td colSpan={selectedColumns.length + 2}>
            Nothing to show
          </td>
        </tr>
      )}
    </tbody>
  )
}
