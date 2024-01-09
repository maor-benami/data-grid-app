import { useState } from 'react'

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  return {
    searchValue,
    setSearchValue,
  }
}
