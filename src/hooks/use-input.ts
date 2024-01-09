import type { DataValue } from '@/types'

import { useState } from 'react'

export const useInput = (
  initialValue?: DataValue,
  options?: Array<string>,
) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (_name: string, value: DataValue) => {
    setValue(value)
  }

  return {
    options,
    value,
    onChange,
  }
}
