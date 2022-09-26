<template>
  <header>
    <!-- <SiteNavigation /> -->
  </header>
  <div class="text-center">
    <div class="pokedex-logo-wrapper">
      <img
        alt="PokemonDex Arena logo"
        class="pokedex-logo"
        src="@/assets/pokedex-logo.png"
      />
    </div>
  </div>

  <RouterView />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { PSEUDOLOCAL_DATABASE_PATH } from "./utils/constant";
import { initDataPath } from "./store/pseudolocalDatabase";

const pokemonFavouritesPath = ref(PSEUDOLOCAL_DATABASE_PATH.pokemonFavourites);
const pokemonTeamsPath = ref(PSEUDOLOCAL_DATABASE_PATH.pokemonTeams);
const historyPath = ref(PSEUDOLOCAL_DATABASE_PATH.historyPath);

onMounted(() => {
  initDataPath(pokemonFavouritesPath.value, []);
  initDataPath(pokemonTeamsPath.value, []);
  initDataPath(historyPath.value, []);
});
</script>

<style lang="css" scoped>
.pokedex-logo-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 160px;
}

.pokedex-logo {
  width: 100%;
  height: auto;
}
</style>
