<template>
  <div class="sticky-position my-4">
    <div class="input-container">
      <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-8">
          <input
            v-model="searchPokemon"
            type="text"
            class="search-bar"
            placeholder="Search Pokemon Name..."
            @keyup.enter="getPokemonData"
          />
        </div>
        <div class="col-6 col-md-2 my-1">
          <PokeButton :btn-text="'Search'" @btn-action="getPokemonData" />
        </div>
        <div class="col-6 col-md-2 my-1">
          <PokeButton
            :is-secondary="true"
            :btn-text="'Filter'"
            @btn-action="$emit('open-filter')"
          />
        </div>
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-12">
          <div v-if="isLoading" class="text-center">
            <PokeLoading />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  fetchPokemonDataList,
  fetchPokemonDataListByName,
} from "../manager/pokemon";
import PokeButton from "./base/PokeButton.vue";
import PokeLoading from "./base/PokeLoading.vue";

const emit = defineEmits(["open-filter", "search-pokemon"]);

const searchPokemon = ref("");
const searchTimeout = ref(null);
let isLoading = ref(false);

const getPokemonData = () => {
  isLoading.value = true;
  searchTimeout.value = setTimeout(() => {
    if (searchPokemon.value !== "") {
      fetchPokemonDataByName();
    } else {
      fetchPokemonData();
    }
  }, 1000);
};

const fetchPokemonDataByName = () => {
  fetchPokemonDataListByName({ name: searchPokemon.value })
    .then((response) => {
      const { data } = response.data;
      isLoading.value = false;
      if (data?.pokemon?.id) {
        return emit("search-pokemon", [data.pokemon]);
      }
      return emit("search-pokemon", []);
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
      return emit("search-pokemon", []);
    });
};

const fetchPokemonData = () => {
  fetchPokemonDataList({ totalData: 16 })
    .then((response) => {
      const { data } = response.data;
      isLoading.value = false;
      if (data?.length !== 0) {
        return emit("search-pokemon", [...data.pokemons], false);
      }
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
      return emit("search-pokemon", [], false);
    });
};
</script>

<style lang="css" scoped>
.sticky-position {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--vt-c-black);
  padding-top: 8px;
}

.input-container {
  width: 100%;
  max-width: 720px;
  margin: 0% auto;
}

.search-bar {
  background-color: var(--vt-c-black-soft);
  color: var(--vt-c-white);
  font-size: 0.9em;
  padding: 8px;
  outline: 1px solid var(--vt-c-white);
  border: none;
  border-radius: var(--border-radius-full);
}

.search-bar::placeholder {
  font-size: 0.85em;
}
</style>
