import type { InputProps, OptionProps } from '@/types'

import React from 'react'

import { Button } from './button.tsx'
import { Input } from './input.tsx'
import { Modal } from './modal.tsx'
import { Switch } from './switch.tsx'

import { useModal } from '../hooks/use-modal.ts'

const MultiSelectOption: React.FC<OptionProps> = (props) => {
  const value = props?.value as Array<string>
  const valueIndex = value.indexOf(props.option)
  const checked = valueIndex > -1

  return (
    <fieldset className="select-item">
      <label className="block">
        <div className="flex align-center gap-3 padding-3">
          <Switch
            checked={checked}
            onChange={() => {
              if (!props.onChange) {
                return
              }

              const newValue = [...value]

              if (checked) {
                newValue.splice(valueIndex, 1)
              } else {
                newValue.push(props.option)
              }

              props.onChange(props.name, newValue)
            }}
          />
          {props.option}
        </div>
      </label>
    </fieldset>
  )
}

const AddItemForm: React.FC<InputProps> = (props) => {
  const value = props?.value as Array<string>

  return (
    <form
      className="flex align-center gap-3"
      onSubmit={(e) => {
        e.preventDefault()

        if (!props.onChange) {
          return
        }

        const target = e.target as HTMLFormElement

        const formData = Object.fromEntries(new FormData(target))

        const newValue = [
          ...value,
          formData[`${props.name}-select`],
        ]

        props.onChange(props.name, newValue)
        target.reset()
      }}
    >
      <Input
        className="padding-1 full-width"
        name={`${props.name}-select`}
        type="string"
      />

      <Button className="padding-1">Add</Button>
    </form>
  )
}

export const MultiSelect: React.FC<InputProps> = (props) => {
  const value = props?.value as Array<string>
  const { open, toggle } = useModal()

  if (!value) {
    return
  }

  return (
    <>
      <Button
        onClick={() => toggle()}
        className="ellipsis"
        disabled={props.disabled}
      >
        {value.length
          ? value.join(', ')
          : props.placeholder || 'None'}
      </Button>

      <Modal open={open} toggle={toggle}>
        <div style={{ minWidth: '70rem' }}>
          <h2>{props.title || props.name}</h2>
          <br />
          <hr />
          <br />
          <div className="flex column gap-3">
            {props.options ? (
              props.options.map((option) => {
                return (
                  <MultiSelectOption
                    key={option}
                    {...props}
                    option={option}
                  />
                )
              })
            ) : (
              <div>
                <div className="flex column gap-3">
                  {value.map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="flex justify-between gap-3">
                          <div className="grow-1">
                            <Input
                              className="padding-1 block full-width"
                              name={item}
                              type="string"
                              value={item}
                              onChange={(_, _value) => {
                                let newValue = value.slice(0, i)

                                newValue = [
                                  ...newValue,
                                  `${_value}`,
                                  ...value.slice(i + 1),
                                ]

                                props.onChange &&
                                  props.onChange(
                                    props.name,
                                    newValue,
                                  )
                              }}
                            />
                          </div>

                          <Button
                            className="padding-1"
                            onClick={() => {
                              let newValue = value.slice(0, i)

                              newValue = [
                                ...newValue,
                                ...value.slice(i + 1),
                              ]

                              props.onChange &&
                                props.onChange(
                                  props.name,
                                  newValue,
                                )
                            }}
                          >
                            x
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <br />

                <fieldset className="padding-3">
                  <AddItemForm {...props} />
                </fieldset>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
