import { Component, JSXElement } from 'solid-js'
import { sorting } from '../App'

export interface ButtonProps {
  disabled?: boolean
  onclick?: (event: MouseEvent) => void
  children: JSXElement
}

export const Button: Component<ButtonProps> = ({
  disabled = false,
  onclick: onClick,
  children
}) => (
  <button
    classList={{
      'active:scale-95 inline-flex rounded-md items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 h-9 px-2':
        true,
      'opacity-50': sorting(),
      'opacity-100': !sorting()
    }}
    onClick={onClick}
    disabled={sorting()}
  >
    {children}
  </button>
)
