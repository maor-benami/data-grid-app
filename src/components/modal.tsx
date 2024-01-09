import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import { Button } from './button.tsx'

export const Modal: React.FC<{
  open: boolean
  toggle: (bool?: boolean) => void
  position?: 'start' | 'end' | 'center'
  children?: React.ReactNode
}> = (props) => {
  const position = props.position || 'center'
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const closeModal = useCallback(() => {
    setIsClosing(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      props.toggle(false)
      setIsClosing(false)
    }, 350)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        setIsClosing(false)
      }
    }
  }, [])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.open) {
        closeModal()
      }
    }

    document.addEventListener('keyup', onEsc)

    return () => {
      document.removeEventListener('keyup', onEsc)
    }
  }, [props.open, closeModal])

  return (
    <>
      {props.open &&
        createPortal(
          <div
            className={clsx(
              'modal-c fixed inset-0 z-2',
              isClosing && 'closing',
            )}
          >
            <div
              className="absolute inset-0 backdrop-bg modal-backdrop"
              onClick={closeModal}
            />

            <div
              className={clsx(
                'frame absolute z-1',
                position !== 'center'
                  ? 'full-height'
                  : 'bottom-50 right-50 translate-x-y-50',
              )}
            >
              <div
                className="bg modal-box scroll"
                style={{ overflowY: 'auto' }}
              >
                <div
                  className="absolute"
                  style={{ right: '2rem', top: '2rem' }}
                >
                  <Button
                    className="padding-1"
                    onClick={closeModal}
                  >
                    <div className="padding-1">
                      <small>✕</small>
                    </div>
                  </Button>
                </div>

                <div
                  className="padding-5 full-width"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="padding-3">{props.children}</div>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById('modal')!,
        )}
    </>
  )
}
