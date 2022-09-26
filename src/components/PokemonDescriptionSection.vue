<template>
  <div class="row justify-content-center my-4">
    <div class="col-12">
      <div class="text-center my-4">
        <div class="pokedex-image-wrapper">
          <img class="pokedex-image" :src="getImageUrl(image)" alt="Pokemon" />
        </div>
      </div>
    </div>
    <div class="col-12 detail-content text-center">
      <p class="text-pokemon-title">Number:</p>
      <p class="text-pokemon-name">No. {{ number }}</p>
      <p class="text-pokemon-title">Name:</p>
      <p class="text-pokemon-name">{{ name }}</p>
      <p class="text-pokemon-title">Classification:</p>
      <p class="text-pokemon-name">{{ classification }}</p>
      <br />
      <p class="text-pokemon-title">Max CP:</p>
      <p class="text-pokemon-cp">{{ maxCP }}</p>
      <p class="text-pokemon-title">Flee Rate:</p>
      <p class="text-pokemon-cp">{{ fleeRate }}</p>
      <br />
      <p class="text-pokemon-title">Type:</p>
      <PokeChip :chip-types="types" :custom-class="'justify-content-center'" />
      <p class="text-pokemon-title">resistant:</p>
      <PokeChip
        :chip-types="resistant"
        :custom-class="'justify-content-center'"
      />
      <p class="text-pokemon-title">Weakness:</p>
      <PokeChip
        :chip-types="weaknesses"
        :custom-class="'justify-content-center'"
      />
    </div>
  </div>
</template>

<script setup>
import PokeChip from "./base/PokeChip.vue";

defineProps({
  image: {
    type: String,
    default: () => {
      return new URL(`../assets/pokedex-logo.png`, import.meta.url).href;
    },
  },
  number: {
    type: String,
    default: "000",
  },
  name: {
    type: String,
    default: "",
  },
  classification: {
    type: String,
    default: "",
  },
  maxCP: {
    type: Number,
    default: 0,
  },
  fleeRate: {
    type: Number,
    default: 0,
  },
  types: {
    type: Array,
    default: () => [],
  },
  resistant: {
    type: Array,
    default: () => [],
  },
  weaknesses: {
    type: Array,
    default: () => [],
  },
});

const getImageUrl = (image) => {
  return new URL(image, import.meta.url).href;
};
</script>

<style lang="css" scoped>
.pokedex-image-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 240px;
}

.pokedex-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-quarter);
}

.detail-content {
  justify-content: center;
}

.detail-content .text-pokemon-title {
  font-size: 0.9em;
}
.detail-content .text-pokemon-name {
  font-size: 1.1em;
  word-break: break-all;
}
.detail-content .text-pokemon-cp {
  color: var(--primary-text-orange);
  font-size: 1.2em;
  font-weight: bold;
}
</style>
