import { useState } from 'react'

export const useModal = () => {
  const [open, setIsOpen] = useState(false)

  const toggle = (bool?: boolean) => {
    setIsOpen((prev) => {
      if (bool !== undefined) {
        return bool
      }

      return !prev
    })
  }

  return {
    open,
    toggle,
  }
}
