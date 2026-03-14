<template>
  <div class="container about-page">
    <PokePageTitle :page-title="'About PokemonDex Arena'" />

    <section class="about-section">
      <h2 class="section-title">General Description</h2>
      <div class="section-card">
        <p>
          PokemonDex Arena helps trainers discover Pokemon, save favorites, and
          build a battle-ready team with a maximum of 6 members.
        </p>
        <p>
          Use the Card List to explore Pokemon data, then open Team Builder to
          choose your lineup slot by slot.
        </p>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title">Trainer Team ({{ pokemonTeams.length }}/6)</h2>
      <div v-if="pokemonTeams.length !== 0" class="row">
        <div
          v-for="pokemon in pokemonTeams"
          :key="pokemon.id"
          class="col-12 col-md-6 col-lg-4 my-2"
        >
          <div class="section-card pokemon-card">
            <div class="pokemon-image-wrapper">
              <img
                :src="pokemon.image"
                :alt="pokemon.name"
                class="pokemon-image"
              />
            </div>
            <p class="text-pokemon-title">No. {{ pokemon.number }}</p>
            <p class="text-pokemon-name">{{ pokemon.name }}</p>
            <PokeChip
              :chip-types="pokemon.types"
              :custom-class="'justify-content-center'"
            />
            <router-link :to="`/pokemon-detail/${pokemon.name}`">
              <PokeButton :btn-text="'Check Detail'" />
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="section-card text-center">
        <p>No Pokemon in trainer team yet.</p>
      </div>
    </section>

    <section class="about-section">
      <h2 class="section-title">
        Favourite Pokemon ({{ pokemonFavourites.length }})
      </h2>
      <div v-if="pokemonFavourites.length !== 0" class="row">
        <div
          v-for="pokemon in pokemonFavourites"
          :key="pokemon.id"
          class="col-12 col-md-6 col-lg-4 my-2"
        >
          <div class="section-card pokemon-card">
            <div class="pokemon-image-wrapper">
              <img
                :src="pokemon.image"
                :alt="pokemon.name"
                class="pokemon-image"
              />
            </div>
            <p class="text-pokemon-title">No. {{ pokemon.number }}</p>
            <p class="text-pokemon-name">{{ pokemon.name }}</p>
            <PokeChip
              :chip-types="pokemon.types"
              :custom-class="'justify-content-center'"
            />
            <router-link :to="`/pokemon-detail/${pokemon.name}`">
              <PokeButton :btn-text="'Check Detail'" :is-secondary="true" />
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="section-card text-center">
        <p>No favourite Pokemon yet.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PokePageTitle from "../components/base/PokePageTitle.vue";
import PokeChip from "../components/base/PokeChip.vue";
import PokeButton from "../components/base/PokeButton.vue";
import { getDataPath } from "../store/pseudolocalDatabase";
import { PSEUDOLOCAL_DATABASE_PATH } from "../utils/constant";

const pokemonTeams = computed(() => {
  return getDataPath(PSEUDOLOCAL_DATABASE_PATH.pokemonTeams).slice(0, 6);
});

const pokemonFavourites = computed(() => {
  return getDataPath(PSEUDOLOCAL_DATABASE_PATH.pokemonFavourites);
});
</script>

<style lang="css" scoped>
.about-page {
  color: var(--vt-c-white);
}

.about-section {
  margin-bottom: 32px;
}

.section-title {
  color: var(--primary-text-orange);
  margin-bottom: 12px;
}

.section-card {
  background-color: var(--vt-c-black-soft);
  border: 2px solid var(--primary-text-orange);
  border-radius: var(--border-radius);
  padding: 16px;
}

.pokemon-card {
  text-align: center;
  height: 100%;
}

.pokemon-image-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--border-radius-quarter);
}

.text-pokemon-title {
  font-size: 0.9em;
  margin-bottom: 4px;
}

.text-pokemon-name {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 12px;
}
</style>
