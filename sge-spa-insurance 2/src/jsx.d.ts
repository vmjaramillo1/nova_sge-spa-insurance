/* eslint-disable @typescript-eslint/no-empty-interface */
import { JSX as LocalJSX } from '../ds/types'

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'>
}

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>
}

type StencilToReact<
  T = LocalJSX.IntrinsicElements,
  U = HTMLElementTagNameMap
> = StencilProps<T> & ReactProps<U>

declare global {
  export namespace JSX {
    export interface IntrinsicElements extends StencilToReact {}
  }
}
