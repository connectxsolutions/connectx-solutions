'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  wrapperRef: React.RefObject<HTMLDivElement | null>
  close: () => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!open) return
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const close = React.useCallback(() => setOpen(false), [])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, wrapperRef, close }}>
      <div className="relative inline-block" ref={wrapperRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactElement<any>
}

export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenuTrigger must be used within a DropdownMenu')
  }

  const { open, setOpen } = context

  const handleClick = (event: React.MouseEvent) => {
    setOpen(prev => !prev)
    if (children.props?.onClick) {
      children.props.onClick(event)
    }
  }

  const triggerProps = {
    'aria-haspopup': 'menu' as const,
    'aria-expanded': open,
    onClick: handleClick,
  }

  if (asChild) {
    return React.cloneElement(children, triggerProps)
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  )
}

interface DropdownMenuContentProps {
  align?: 'start' | 'end'
  children: React.ReactNode
  className?: string
}

export function DropdownMenuContent({
  align = 'start',
  children,
  className,
}: DropdownMenuContentProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenuContent must be used within a DropdownMenu')
  }

  const { open } = context
  if (!open) {
    return null
  }

  return (
    <div
      className={cn(
        'absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md',
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
      role="menu"
    >
      {children}
    </div>
  )
}

interface DropdownMenuItemProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function DropdownMenuItem({
  onClick,
  disabled,
  children,
  className,
}: DropdownMenuItemProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenuItem must be used within a DropdownMenu')
  }

  const { close } = context

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    onClick?.(event)
    close()
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}
