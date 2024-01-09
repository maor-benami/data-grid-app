import type { TableData } from '@/types'

import { useMemo, useState } from 'react'

export const usePagination = (data: TableData) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / pageSize))
  }, [data.length, pageSize])

  const first = () => {
    setCurrentPage(1)
  }

  const prev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const next = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const last = () => {
    setCurrentPage(totalPages)
  }

  const goTo = (page: number) => {
    setCurrentPage(page)
  }

  const to = useMemo(() => {
    return currentPage * pageSize
  }, [currentPage, pageSize])

  const from = useMemo(() => {
    return to - pageSize + 1
  }, [to, pageSize])

  return {
    pageSize,
    currentPage,
    totalPages,
    from,
    to,
    setPageSize,
    goTo,
    first,
    prev,
    next,
    last,
  }
}
