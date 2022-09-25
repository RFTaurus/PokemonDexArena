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
      <PokeChip :chip-types="types" />
    </div>
    <div class="col-12">
      <router-link :to="`/pokemon-detail/${name}`">
        <PokeButton :btn-text="'Check Detail'" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import PokeButton from "./base/PokeButton.vue";
import PokeChip from "./base/PokeChip.vue";

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

  .card-content {
    text-align: center;
  }
}
</style>
