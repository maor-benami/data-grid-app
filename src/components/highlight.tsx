import React from 'react'

export const Highlight: React.FC<{
  text: string
  term: string
}> = (props) => {
  const searchTerm = props.term.toLowerCase()

  if (!searchTerm) {
    return <span>{props.text}</span>
  }

  const highlightText = props.text.toLowerCase()
  const split = highlightText.split(searchTerm)

  return (
    <span>
      {split.map((t, i) => {
        return (
          <React.Fragment key={i}>
            <span>{t}</span>
            {i < split.length - 1 && (
              <span className="h">{searchTerm}</span>
            )}
          </React.Fragment>
        )
      })}
    </span>
  )
}
