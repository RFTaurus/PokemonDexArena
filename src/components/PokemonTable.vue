<template>
  <div class="d-contents">
    <div v-if="pokemonData || pokemonData?.length !== 0">
      <br />
      <div class="row">
        <div class="col-12 detail-content">
          <p class="text-pokemon-highlight">{{ pokemonTableTitle }}</p>
        </div>
        <div class="col-12 detail-content">
          <table class="text-left">
            <tr class="table-header">
              <th
                v-for="(itemHeader, index) in pokemonTableHeader"
                :key="index"
                :class="itemHeader.isCenter ? 'th-special' : ''"
                :style="pokemonTableWidth ? pokemonTableWidth : ''"
              >
                {{ itemHeader.name }}
              </th>
            </tr>
            <div v-if="isArray && isEvolutionLine" class="d-contents">
              <tr v-for="(evolution, index) in pokemonData" :key="index">
                <td>
                  <div class="text-center my-4">
                    <div class="pokedex-image-evolution-line-wrapper">
                      <img
                        class="pokedex-image"
                        :src="getImageUrl(evolution?.image)"
                        alt="Pokemon"
                      />
                    </div>
                  </div>
                </td>
                <td>{{ evolution.name }}</td>
                <td>
                  {{
                    evolution?.evolutionRequirements?.name
                      ? evolution?.evolutionRequirements.name
                      : "-"
                  }}
                  <span class="text-pokemon-evolution-highlight">
                    {{
                      evolution?.evolutionRequirements?.amount
                        ? `(${evolution?.evolutionRequirements?.amount}x)`
                        : ""
                    }}
                  </span>
                </td>
                <td class="text-center">
                  <PokeButton
                    :btn-text="'Check'"
                    @btn-action="$emit('btn-action', evolution.name)"
                  />
                </td>
              </tr>
            </div>
            <div v-else-if="isArray && !isEvolutionLine" class="d-contents">
              <tr v-for="(data, index) in pokemonData" :key="index">
                <td>{{ data.name }}</td>
                <td>
                  <PokeChip :chip-types="[data.type]" />
                </td>
                <td class="text-pokemon-number">{{ data.damage }}</td>
              </tr>
            </div>
            <div v-else-if="!isArray && !isEvolutionLine" class="d-contents">
              <tr>
                <td v-for="(itemData, name, index) in pokemonData" :key="index">
                  <span>{{ itemData || "-" }}</span>
                </td>
              </tr>
            </div>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <br />
      <div class="row">
        <div class="col-12 detail-content">
          <p class="text-pokemon-highlight">{{ pokemonTableTitle }}</p>
          <p class="text-pokemon-exception">No {{ pokemonTableTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PokeChip from "./base/PokeChip.vue";
import PokeButton from "./base/PokeButton.vue";

defineEmits(["btn-action"]);
defineProps({
  pokemonData: {
    type: Object,
    default: () => {},
  },
  pokemonTableTitle: {
    type: String,
    default: "",
  },
  pokemonTableHeader: {
    type: Array,
    default: () => [
      { name: "Table Header 1", isCenter: false },
      { name: "Table Header 2", isCenter: false },
    ],
  },
  pokemonTableWidth: {
    type: String,
    default: "",
  },
  isArray: {
    type: Boolean,
    default: false,
  },
  isEvolutionLine: {
    type: Boolean,
    default: false,
  },
});

const defaultImage = ref("../assets/pokedex-logo.png");

const getImageUrl = (image = defaultImage.value) => {
  return new URL(image, import.meta.url).href;
};
</script>

<style lang="css" scoped>
.text-pokemon-evolution-highlight {
  color: var(--primary-text-orange);
  font-size: 0.9em;
  font-weight: bold;
}

.text-pokemon-highlight {
  color: var(--primary-text-orange);
  font-size: 1.3em;
  font-weight: bold;
}

table {
  border-collapse: collapse;
  width: 100%;
}

.table-header {
  font-size: 1.2em;
  font-weight: bold;
}

table tr {
  vertical-align: middle;
}

table th,
table td {
  font-size: 0.8em;
  width: 33.33%;
  border: 1px solid var(--vt-c-white-mute);
  padding: var(--padding-gap-half);
}

table th {
  text-align: left;
  background-color: var(--primary-text-orange);
  color: var(--vt-c-black);
  font-weight: bold;
}

.pokedex-image-evolution-line-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 128px;
}

.pokedex-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-quarter);
}

@media (min-width: 768px) {
  table th,
  table td {
    font-size: 1.2em;
    width: 33.33%;
  }
}

@media (min-width: 1024px) {
  table .th-special {
    text-align: center;
  }
}
</style>
