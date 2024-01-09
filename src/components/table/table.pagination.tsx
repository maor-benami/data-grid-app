import { useTableContext } from './table.context.tsx'

import { Input } from '../input.tsx'
import { Button } from '../button.tsx'

export const TablePagination = () => {
  const { pagination } = useTableContext()

  return (
    <div className="flex align-center gap-1">
      <div>
        <Button
          className="padding-1"
          onClick={pagination.first}
          title="First"
        >
          <div className="padding-i-1">«</div>
        </Button>
      </div>

      <div>
        <Button
          className="padding-1"
          onClick={pagination.prev}
          title="Previous"
        >
          <div className="padding-i-1">‹</div>
        </Button>
      </div>

      <div>
        <Input
          name="page"
          type="number"
          min={1}
          max={pagination.totalPages}
          value={pagination.currentPage}
          onChange={(_, value) => {
            pagination.goTo(Number(value))
          }}
          className="padding-1"
          style={{ width: '16rem' }}
        />
        <span className="sec-text">
          {' / '}
          {pagination.totalPages}
        </span>
      </div>

      <div>
        <Button
          className="padding-1"
          onClick={pagination.next}
          title="Next"
        >
          <div className="padding-i-1">›</div>
        </Button>
      </div>

      <div>
        <Button
          className="padding-1"
          onClick={pagination.last}
          title="Last"
        >
          <div className="padding-i-1">»</div>
        </Button>
      </div>
    </div>
  )
}
