import { useRef } from 'react'

export const useDebounce = () => {
  const debounce = useRef<NodeJS.Timeout | null>(null)

  return {
    debounce: (func: () => unknown, time = 100) => {
      if (debounce.current) {
        clearTimeout(debounce.current)
      }

      if (func) {
        debounce.current = setTimeout(func, time)
      }
    },
  }
}
