<template>
  <div
    class="row align-items-center justify-content-space-around card-lite-container"
  >
    <div :class="`favourite-wrapper`">
      <div
        :class="`pointer ${isFavourite ? 'favourite-item' : ''}`"
        @click="addFavourite"
      >
        <i class="fas fa-heart"></i>
      </div>
    </div>
    <div class="col-5 col-md-5 card-header py-4">
      <div class="d-block">
        <img
          alt="Vue pokemon-logo"
          class="pokemon-logo pointer"
          :src="props.image"
          @click="$emit('show-pokemon-image')"
        />
      </div>
    </div>
    <div class="col-7 col-md-7 card-lite-content">
      <p class="text-pokemon-title">No. {{ props.number }}</p>
      <p class="text-pokemon-name">
        <strong>{{ props.name }}</strong>
      </p>
      <p class="text-pokemon-title">max CP:</p>
      <p class="text-pokemon-cp">{{ props.maxCP }}</p>
      <p class="text-pokemon-title">Type</p>
      <PokeChip
        :chip-types="props.types"
        :custom-class="'justify-content-start'"
      />
    </div>
    <div class="col-12 mb-4">
      <router-link :to="`/pokemon-detail/${props.name}`">
        <PokeButton :btn-text="'Check Detail'" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PokeButton from "./base/PokeButton.vue";
import PokeChip from "./base/PokeChip.vue";

const emit = defineEmits([
  "show-pokemon-image",
  "goto-pokemon-detail",
  "add-favourite",
  "add-team",
]);

const props = defineProps({
  id: {
    type: String,
    default: "",
    required: true,
  },
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
  isFavourite: {
    type: Boolean,
    default: false,
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
});

let isFavourite = ref(props.isFavourite);

const addFavourite = () => {
  isFavourite.value = !isFavourite.value;
  const pokemonData = { ...props, isFavourite: isFavourite.value };

  return emit("add-favourite", pokemonData, true);
};
</script>

<style lang="css" scoped>
.favourite-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 1.5em;
  color: var(--vt-c-white);
  padding: 8px;
  z-index: 999;
}

.favourite-item {
  color: red;
}

.team-item {
  color: #78c850;
}

.card-header .pokemon-logo {
  width: 100%;
  max-width: 96px;
  height: auto;
  border-radius: var(--border-radius-quarter);
  transform: scale(1);
}

.card-lite-content {
  padding: var(--padding-gap);
  color: #f6f6f6;
  font-size: 1em;
  text-align: left;
}

.card-lite-content .text-pokemon-title {
  font-size: 0.9em;
}
.card-lite-content .text-pokemon-name {
  font-size: 1.1em;
  word-break: break-all;
}
.card-lite-content .text-pokemon-cp {
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
  .card-lite-container {
    width: 100%;
    max-width: 480px;
  }

  .card-header .pokemon-logo {
    object-fit: cover;
    transform: scale(1);
    transition: 0.5s;
  }

  .card-header .pokemon-logo:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }

  .card-lite-content {
    text-align: left;
  }
}
</style>
