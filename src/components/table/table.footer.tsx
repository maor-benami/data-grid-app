import { useTableContext } from './table.context.tsx'

import { formatNumber } from '../../utils/formatter.ts'

import { Input } from '../input.tsx'
import { TablePagination } from './table.pagination.tsx'

export const TableFooter = () => {
  const { data, pageData, selectedColumns, pagination, group } =
    useTableContext()

  const from = pagination.from
  const to = !pageData.length
    ? 0
    : Math.max(pagination.to, pageData.length) -
      group.groupKeys.length

  return (
    <tfoot>
      <tr>
        <td colSpan={selectedColumns.length + 2}>
          <div
            className="flex align-center justify-between"
            style={{ padding: '1rem 2rem' }}
          >
            <div className="flex separator separator-2">
              <div className="flex gap-3">
                <div className="sec-text">Total:</div>
                <div>{formatNumber(data.length)}</div>
              </div>

              {group.groupBy ? (
                <div className="flex gap-3">
                  <div className="sec-text">Groups:</div>
                  {formatNumber(group.groupKeys.length)}
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="sec-text">Items:</div>
                  <div>
                    {!to
                      ? 0
                      : `${formatNumber(from)} - ${formatNumber(
                          to,
                        )}`}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex align-center separator separator-2">
                <div>
                  <div className="flex align-center gap-3">
                    <div className="sec-text">Page size:</div>

                    <Input
                      name="page-size"
                      type="list"
                      value={[pagination.pageSize]}
                      options={['25', '50', '100', '150']}
                      onChange={(_, value) => {
                        pagination.goTo(1)
                        pagination.setPageSize(Number(value))
                      }}
                      className="padding-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <TablePagination />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
