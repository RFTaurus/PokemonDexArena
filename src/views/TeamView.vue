<template>
  <div class="container">
    <PokePageTitle :page-title="'PokemonDex Arena Team Builder'" />

    <div class="row justify-content-center my-4">
      <div class="col-8 col-md-3 col-lg-2">
        <router-link to="/">
          <PokeButton :is-secondary="true" :btn-text="'Back to List'" />
        </router-link>
      </div>
    </div>

    <TeamSection
      :team="pokemonTeams"
      :selected-slot-index="selectedSlotIndex"
      @select-slot="selectSlot"
      @remove-team="removeFromTeam"
      @clear-team="clearTeam"
    />

    <div class="slot-helper text-center my-4">
      <p>
        Selected slot:
        <span class="slot-highlight">#{{ selectedSlotIndex + 1 }}</span>
      </p>
      <p>Pick any Pokemon below to fill or replace this slot directly.</p>
    </div>

    <PokemonControlSection @search-pokemon="getPokemonData" />

    <div v-if="isLoading" class="text-center my-4">
      <PokeLoading />
    </div>

    <div
      v-else-if="pokemons?.length !== 0"
      class="row align-items-center justify-content-space-between text-center pb-4"
    >
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="col-12 col-md-6 col-lg-3 my-4"
      >
        <PokemonCard
          :id="pokemon.id"
          :image="pokemon.image"
          :number="pokemon.number"
          :name="pokemon.name"
          :max-c-p="pokemon.maxCP"
          :types="pokemon.types"
          :is-team="pokemon.isTeam"
          @add-team="fillTeamSlot"
        />
      </div>
    </div>
    <div v-else>
      <h3 class="text-center">There is no Pokemon Card List</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchPokemonDataList } from "../manager/pokemon";
import { setDataPath, getDataPath } from "../store/pseudolocalDatabase";
import { PSEUDOLOCAL_DATABASE_PATH } from "../utils/constant";
import PokePageTitle from "../components/base/PokePageTitle.vue";
import PokeButton from "../components/base/PokeButton.vue";
import PokemonControlSection from "../components/PokemonControlSection.vue";
import TeamSection from "../components/TeamSection.vue";
import PokemonCard from "../components/PokemonCard.vue";
import PokeLoading from "../components/base/PokeLoading.vue";

const pokemonTeamsPath = ref(PSEUDOLOCAL_DATABASE_PATH.pokemonTeams);
const pokemonTeams = ref(getDataPath(pokemonTeamsPath.value).slice(0, 6));
const pokemonsOriginal = ref([]);
const pokemons = ref([]);
const selectedSlotIndex = ref(0);
const isLoading = ref(false);

onMounted(() => {
  setDataPath(pokemonTeamsPath.value, pokemonTeams.value);
  fetchPokemonData();
});

const isTeamPokemon = (id) => {
  return pokemonTeams.value.some((item) => item.id === id);
};

const mapPokemonList = (pokemonData) => {
  return pokemonData.map((item) => {
    return {
      ...item,
      isTeam: isTeamPokemon(item.id),
    };
  });
};

const syncTeamFlag = () => {
  pokemonsOriginal.value = mapPokemonList(pokemonsOriginal.value);
  pokemons.value = mapPokemonList(pokemons.value);
};

const selectSlot = (index) => {
  if (index >= 0 && index <= 5) {
    selectedSlotIndex.value = index;
  }
};

const saveTeam = () => {
  pokemonTeams.value = pokemonTeams.value.filter(Boolean).slice(0, 6);
  setDataPath(pokemonTeamsPath.value, pokemonTeams.value);
  syncTeamFlag();
};

const getPokemonData = (pokemonData) => {
  pokemons.value = mapPokemonList(pokemonData);
};

const fillTeamSlot = (pokemonData) => {
  const existingIndex = pokemonTeams.value.findIndex((item) => {
    return item.id === pokemonData.id;
  });

  if (existingIndex !== -1) {
    if (existingIndex === selectedSlotIndex.value) {
      return;
    }
    pokemonTeams.value.splice(existingIndex, 1);
  }

  pokemonTeams.value[selectedSlotIndex.value] = {
    ...pokemonData,
    isTeam: true,
  };
  saveTeam();

  if (selectedSlotIndex.value < 5) {
    selectedSlotIndex.value += 1;
  }
};

const removeFromTeam = (index) => {
  pokemonTeams.value.splice(index, 1);
  saveTeam();

  if (selectedSlotIndex.value > pokemonTeams.value.length) {
    selectedSlotIndex.value = pokemonTeams.value.length;
  }
};

const clearTeam = () => {
  if (confirm("Are you sure you want to clear your team?")) {
    pokemonTeams.value = [];
    selectedSlotIndex.value = 0;
    saveTeam();
  }
};

const fetchPokemonData = () => {
  isLoading.value = true;
  fetchPokemonDataList({
    totalData: 151,
  })
    .then((response) => {
      const { data } = response.data;
      if (data?.pokemons?.length !== 0) {
        pokemonsOriginal.value = mapPokemonList(data.pokemons);
        pokemons.value = [...pokemonsOriginal.value];
      }
      isLoading.value = false;
      return;
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
      return;
    });
};
</script>

<style lang="css" scoped>
.slot-helper {
  color: var(--vt-c-white);
}

.slot-helper p {
  margin-bottom: 8px;
}

.slot-highlight {
  color: var(--primary-text-orange);
  font-weight: bold;
}
</style>
