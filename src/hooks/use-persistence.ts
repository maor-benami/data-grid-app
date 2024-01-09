import type { TableData } from '@/types'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { formatDistance } from '../utils/formatter.ts'
import {
  getLastUpdated,
  saveData,
  saveLastUpdated,
} from '../utils/storage.ts'

export const usePersistence = () => {
  const [lastUpdated, setLastUpdated] = useState(getLastUpdated())
  const [lastTick, setLastTick] = useState(getLastUpdated())

  const save = useCallback((data: TableData) => {
    setLastUpdated(Date.now())
    saveLastUpdated()
    saveData(data)
  }, [])

  const timeGap = useMemo(() => {
    const now = Date.now()
    return now - (lastUpdated || now) + lastTick - lastTick
  }, [lastTick, lastUpdated])

  const lastUpdatedText = useMemo(() => {
    return timeGap > 0 && lastUpdated && timeGap < 2000
      ? `Just now`
      : timeGap
      ? formatDistance(new Date(lastUpdated), new Date(), {
          addSuffix: true,
        })
      : '---'
  }, [lastUpdated, timeGap])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let isMounted = true

    if (isMounted) {
      intervalId = setInterval(() => {
        setLastTick(Date.now())
      }, 1500)
    }

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  return {
    lastUpdated,
    timeGap,
    lastUpdatedText,
    setLastUpdated,
    save,
  }
}
