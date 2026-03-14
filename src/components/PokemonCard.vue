<template>
  <div class="row align-items-center justify-content-space-around card">
    <div :class="`favourite-wrapper`">
      <div
        :class="`pointer ${isFavourite ? 'favourite-item' : ''}`"
        @click="addFavourite"
      >
        <i class="ri-heart-fill"></i>
      </div>
      <div
        v-if="props.showTeamAction"
        :class="`pointer ${props.isTeam ? 'team-item' : ''}`"
        @click="addTeam"
      >
        <i class="ri-shield-user-line"></i>
      </div>
    </div>
    <div class="col-5 col-md-5 col-lg-12 card-header py-4">
      <div class="d-block">
        <img
          alt="Vue pokemon-logo"
          class="pokemon-logo pointer"
          :src="props.image"
          @click="$emit('show-pokemon-image')"
        />
      </div>
    </div>
    <div class="col-7 col-md-7 col-lg-12 card-content">
      <p class="text-pokemon-title">No. {{ props.number }}</p>
      <p class="text-pokemon-name">
        <strong>{{ props.name }}</strong>
      </p>
      <p class="text-pokemon-title">max CP:</p>
      <p class="text-pokemon-cp">{{ props.maxCP }}</p>
      <p class="text-pokemon-title">Type</p>
      <PokeChip :chip-types="props.types" />
    </div>
    <div class="col-12">
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
  showTeamAction: {
    type: Boolean,
    default: true,
  },
});

let isFavourite = ref(props.isFavourite);

const addFavourite = () => {
  isFavourite.value = !isFavourite.value;
  const pokemonData = { ...props, isFavourite: isFavourite.value };

  return emit("add-favourite", pokemonData);
};

const addTeam = () => {
  const pokemonData = { ...props };
  return emit("add-team", pokemonData);
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
}

.favourite-item {
  color: red;
}

.team-item {
  color: #78c850;
}

.card-header .pokemon-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--border-radius-quarter);
}

.card-header .d-block {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
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

@media (min-width: 1024px) {
  .card-content {
    text-align: center;
  }
}
</style>
