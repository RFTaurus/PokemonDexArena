<template>
  <div
    class="sticky-position my-4"
    :style="`top: ${top}; left: ${left}; bottom: ${bottom}; right: ${right}`"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  top: {
    type: Number,
    default: null,
  },
  bottom: {
    type: Number,
    default: null,
  },
  left: {
    type: Number,
    default: null,
  },
  right: {
    type: Number,
    default: null,
  },
});
</script>

<style lang="css" scoped>
.sticky-position {
  position: fixed;
  z-index: 99;
  padding-top: 8px;
}
</style>
