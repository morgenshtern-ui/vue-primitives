<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from './Toggle.ts'
import { Primitive } from '~/primitive/index.ts'
import { useControllableState } from '~/hooks/useControllableState.ts'
import { composeEventHandlers } from '~/utils/composeEventHandlers.ts'

defineOptions({
  name: 'Toggle',
})

const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  as: 'button',
})

const emit = defineEmits<ToggleEmits>()

const pressed = useControllableState(props, emit, 'pressed', props.defaultPressed)

const onClick = composeEventHandlers((e: Event) => {
  emit('click', e)
}, () => {
  if (!props.disabled) {
    pressed.value = !pressed.value
  }
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="disabled ? '' : undefined"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>