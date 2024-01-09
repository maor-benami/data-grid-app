import type { InputProps } from '@/types'

import React from 'react'

import { Switch } from './switch.tsx'
import { MultiSelect } from './multi-select.tsx'
import { ObjectEditor } from './object-editor.tsx'

export const Input: React.FC<InputProps> = (props) => {
  switch (props.type) {
    case 'boolean':
      return <Switch {...props} />

    case 'string':
    case 'number':
      return (
        <input
          disabled={props.disabled}
          type={props.type}
          name={props.name}
          min={props.min}
          max={props.max}
          value={
            props.value === undefined
              ? undefined
              : `${props.value}`
          }
          onChange={
            props.onChange &&
            ((e) => {
              if (!props.onChange) {
                return
              }

              const { name, value } = e.target

              if (props.type === 'number') {
                props.onChange(name, Number(value))
              } else {
                props.onChange(name, value)
              }
            })
          }
          className={props.className}
          style={props.style}
        />
      )

    case 'list':
      if (props.multiple) {
        return <MultiSelect {...props} />
      }

      return (
        <select
          disabled={props.disabled}
          name={props.name}
          value={`${props.value}`}
          onChange={(e) => {
            const { name, value } = e.target
            props.onChange && props.onChange(name, value)
          }}
          className={props.className}
          style={props.style}
        >
          {props.placeholder && (
            <option value="">{props.placeholder}</option>
          )}

          {props.options?.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            )
          })}
        </select>
      )

    case 'object':
      return <ObjectEditor {...props} />
  }
}
