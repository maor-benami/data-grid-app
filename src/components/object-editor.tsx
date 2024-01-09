import type { InputProps } from '@/types'

import React from 'react'

import { useModal } from '../hooks/use-modal.ts'

import { Button } from './button.tsx'
import { Modal } from './modal.tsx'
import { Input } from './input.tsx'

export const ObjectEditor: React.FC<InputProps> = (props) => {
  const value = props.value as Record<string, unknown>
  const { open, toggle } = useModal()

  if (!props.value) {
    return
  }

  return (
    <div>
      <Button onClick={() => toggle()}>
        {JSON.stringify(props.value)}
      </Button>

      <Modal open={open} toggle={toggle}>
        <div style={{ minWidth: '70rem' }}>
          <h2>{props.title || props.name}</h2>
          <br />
          <hr />
          <br />

          <div className="flex column separator separator-2">
            {Object.keys(value).map((key) => {
              return (
                <fieldset key={key} className="padding-3">
                  <div className="flex align-center justify-between">
                    <div>{key}</div>
                    <div>
                      <Input
                        title={key}
                        name={key}
                        type={(() => {
                          switch (true) {
                            case typeof value[key] === 'boolean':
                              return 'boolean'

                            case typeof value[key] === 'number':
                              return 'number'

                            case Array.isArray(value[key]):
                              return 'string'

                            case typeof value[key] === 'object':
                              return 'object'

                            default:
                              return 'string'
                          }
                        })()}
                        value={value[key]}
                        checked={!!value[key]}
                        onChange={(_, _value) => {
                          const newValue = {
                            ...value,
                            [key]: _value,
                          }

                          props.onChange &&
                            props.onChange(props.name, newValue)
                        }}
                      />
                    </div>
                  </div>
                </fieldset>
              )
            })}
          </div>
        </div>
      </Modal>
    </div>
  )
}
