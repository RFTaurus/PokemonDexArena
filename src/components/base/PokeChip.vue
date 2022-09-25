<template>
  <div>
    <div
      v-if="chipTypes?.length !== 0"
      :class="`row chip-container ${customClass ? customClass : ''}`"
    >
      <div
        v-for="(type, index) in chipTypes"
        :key="index"
        :style="index > 0 ? 'margin-left: 4px' : ''"
      >
        <div
          class="chip"
          :style="`background-color: ${pokemonChipTypeBackground[type]}`"
        >
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
    <div v-else class="row chip-container pt-2">
      <div>
        <div
          class="chip"
          :style="`background-color: ${pokemonChipTypeBackground['???']}`"
        >
          <span>???</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { POKEMON_TYPES_COLOR } from "../../utils/constant";

defineProps({
  chipTypes: {
    type: Array,
    default: () => [],
  },
  customClass: {
    type: String,
    default: "",
  },
});

const pokemonChipTypeBackground = ref(POKEMON_TYPES_COLOR);
</script>

<style lang="css" scoped>
.chip {
  width: 100%;
  max-width: 128px;
}

.chip {
  color: var(--vt-c-white);
  width: fit-content;
  padding: 0px 8px;
  padding-bottom: 2px;
  margin: 4px auto;
  font-size: 0.7em;
  font-weight: bold;
  border-radius: var(--border-radius-full);
}

@media (min-width: 768px) {
  .chip {
    padding: 0px 6px;
    padding-bottom: 2px;
  }

  .chip span {
    padding: 2px calc(var(--padding-gap));
    font-size: 0.75em;
  }
}

@media (min-width: 1024px) {
  .chip-container {
    justify-content: center;
  }

  .chip {
    justify-content: center;
    font-size: 1em;
  }
}
</style>
