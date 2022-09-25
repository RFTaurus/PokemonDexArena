<template>
  <div class="row align-items-center justify-content-space-around card">
    <div class="col-5 col-md-5 col-lg-12 card-header py-4">
      <div class="d-block">
        <img
          alt="Vue pokemon-logo"
          class="pokemon-logo pointer"
          :src="image"
          @click="$emit('show-pokemon-image')"
        />
      </div>
    </div>
    <div class="col-7 col-md-7 col-lg-12 card-content">
      <p class="text-pokemon-title">No. {{ number }}</p>
      <p class="text-pokemon-name">
        <strong>{{ name }}</strong>
      </p>
      <p class="text-pokemon-title">max CP:</p>
      <p class="text-pokemon-cp">{{ maxCP }}</p>
      <p class="text-pokemon-title">Type</p>
      <div v-if="types?.length !== 0" class="row chip-container">
        <div
          v-for="(type, index) in types"
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
    <div class="col-12">
      <router-link :to="`/pokemon-detail/${name}`">
        <PokeButton :btn-text="'Check Detail'" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PokeButton from "./base/PokeButton.vue";
import { POKEMON_TYPES_COLOR } from "../utils/constant";

defineEmits(["show-pokemon-image", "goto-pokemon-detail"]);
defineProps({
  image: {
    type: String,
    default: () => {
      return new URL(`../assets/pokedex-logo.png`, import.meta.url).href;
    },
    required: true,
  },
  number: {
    type: String,
    default: "000",
    required: true,
  },
  name: {
    type: String,
    default: "Pokemon",
    required: true,
  },
  maxCP: {
    type: Number,
    default: 0,
    required: true,
  },
  types: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const pokemonChipTypeBackground = ref(POKEMON_TYPES_COLOR);
</script>

<style lang="css" scoped>
.card-header .pokemon-logo {
  width: 100%;
  max-width: 96px;
  height: auto;
  border-radius: var(--border-radius-quarter);
  transform: scale(1);
}

.card-content {
  padding: var(--padding-gap);
  color: #f6f6f6;
  font-size: 1em;
  text-align: left;
}

.card-content .text-pokemon-title {
  font-size: 0.9em;
}
.card-content .text-pokemon-name {
  font-size: 1.1em;
  word-break: break-all;
}
.card-content .text-pokemon-cp {
  color: var(--primary-text-orange);
  font-size: 1.2em;
  font-weight: bold;
}

.card-content .chip {
  width: 100%;
  max-width: 128px;
}

.card-content .chip {
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
  .card-header .pokemon-logo {
    width: 100%;
    max-width: 160px;
    height: auto;
    min-height: 160px;
    max-height: 160px;
    object-fit: contain;
    border-radius: var(--border-radius-quarter);
  }

  .card-content .chip {
    padding: 0px 6px;
    padding-bottom: 2px;
  }

  .card-content .chip span {
    padding: 2px calc(var(--padding-gap));
    font-size: 0.75em;
  }
}

@media (min-width: 1024px) {
  .card-header .pokemon-logo {
    object-fit: cover;
    transform: scale(1);
    transition: 0.5s;
  }

  .card-header .pokemon-logo:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }

  .card-content .chip-container {
    justify-content: center;
  }

  .card-content {
    text-align: center;
  }

  .card-content .chip {
    justify-content: center;
  }
}
</style>
