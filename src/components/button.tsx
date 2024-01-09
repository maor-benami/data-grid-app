import React from 'react'

export const Button: React.FC<{
  children?: React.ReactNode
  title?: string
  disabled?: boolean
  className?: string
  style?: Record<string, string>
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}> = (props) => {
  return (
    <button
      title={props.title}
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </button>
  )
}
