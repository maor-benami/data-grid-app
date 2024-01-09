import { useCallback, useState } from 'react'
import type { SortDir } from '@/types.d.ts'

export const useSort = () => {
  const [sortBy, setSortBy] = useState('')
  const [sortDir, setSortDir] = useState<SortDir>('az')

  const toggleSort = useCallback(() => {
    setSortDir((prev) => (prev === 'az' ? 'za' : 'az'))
  }, [setSortDir])

  const setSort = useCallback(
    (columnId: string) => {
      if (sortBy === columnId) {
        toggleSort()
      } else {
        setSortBy(columnId)
        setSortDir('az')
      }
    },
    [sortBy],
  )

  return {
    sortBy,
    sortDir,
    setSort,
  }
}
