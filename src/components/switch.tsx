import type { InputProps } from '@/types'

import React from 'react'
import clsx from 'clsx'

export const Switch: React.FC<Partial<InputProps>> = (props) => {
  return (
    <label
      className={clsx(
        'flex inline switch-c padding-1',
        props.checked && 'on',
      )}
      title={props.checked ? 'On' : 'Off'}
    >
      <div className="block">
        <div className="switch-i" />

        <input
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={(e) => {
            const { name, checked } = e.target
            props.onChange && props.onChange(name, checked)
          }}
        />
      </div>
    </label>
  )
}
