<template>
  <div>
    <button
      :class="`button-pokemon pointer ${isSecondary ? 'secondary' : ''}`"
      @click="$emit('btn-action')"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script setup>
defineEmits(["btn-action"]);
defineProps({
  isSecondary: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: "Click Me!",
  },
});
</script>

<style lang="css" scoped>
.button-pokemon {
  background-color: var(--primary-text-orange);
  color: var(--vt-c-black-soft);
  font-weight: bold;
  border: 2px solid var(--primary-text-orange);
  border-radius: var(--border-radius-full);
  padding: 4px;
  font-size: 1em;
  width: 100%;
}

.button-pokemon.secondary {
  background-color: #311b07;
  color: var(--primary-text-orange);
  border: 2px solid var(--primary-text-orange);
}

@media (min-width: 768px) {
  .button-pokemon {
    background-color: var(--primary-text-orange);
    color: var(--vt-c-black);
    border: none;
    border-radius: var(--border-radius-full);
    padding: 8px;
    font-size: 1em;
  }
}
</style>
