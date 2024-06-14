import type { Ref } from 'vue'
// import type { ToggleGroupSingleEmits, ToggleGroupSingleProps } from './ToggleGroupSingle.ts'
import type { PrimitiveProps } from '~/primitive/index.ts'
import type { RovingFocusGroupProps } from '~/roving-focus/index.ts'
import { createContext } from '~/hooks/createContext.ts'

export type ToggleGroupType = 'single' | 'multiple'

export interface ToggleGroupProps<T extends ToggleGroupType> extends ToggleGroupImplProps {
  type: T

  value?: T extends 'single' ? ToggleGroupSingleProps['value'] : ToggleGroupMultipleProps['value']

  defaultValue?: T extends 'single' ? ToggleGroupSingleProps['defaultValue'] : ToggleGroupMultipleProps['defaultValue']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToggleGroupEmits<T extends ToggleGroupType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: T extends 'single' ? NonNullable<ToggleGroupSingleProps['value']> : NonNullable<ToggleGroupMultipleProps['value']>]
}

export interface ToggleGroupSingleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToggleGroupSingleEmits = {
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'update:value': [value: string]
}

export interface ToggleGroupMultipleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToggleGroupMultipleEmits = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: string[]]
}

export interface ToggleGroupImplProps extends PrimitiveProps {
  /**
   * Whether the group is disabled from user interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Whether the group should maintain roving focus of its buttons.
   * @defaultValue true
   */
  rovingFocus?: boolean
  loop?: RovingFocusGroupProps['loop']
  orientation?: RovingFocusGroupProps['orientation']
  dir?: RovingFocusGroupProps['dir']
}

export interface ToggleGroupContextValue {
  type: Ref<'single' | 'multiple'>
  value: Ref<string[]>
  onItemActivate: (value: string) => void
  onItemDeactivate: (value: string) => void
  rovingFocus: Ref<boolean>
  disabled?: Ref<boolean>
}

export const [provideToggleGroupContext, useToggleGroupContext]
  = createContext<ToggleGroupContextValue>('ToggleGroup')
