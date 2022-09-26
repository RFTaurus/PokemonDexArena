<template>
  <div class="pokemon-detail container">
    <PokePageTitle :page-title="'PokemonDex Arena Detail'" />

    <div class="sticky-position my-4">
      <div class="row justify-content-center">
        <div class="col-6 col-md-4 col-lg-2">
          <PokeButton
            :is-secondary="true"
            :btn-text="'Back'"
            @btn-action="goBack"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <PokeButton :btn-text="'Card List'" @btn-action="gotoCardList" />
        </div>
      </div>
    </div>

    <div v-if="pokemonData?.id" class="pokemon-detail-frame my-4 py-4">
      <PokemonDescriptionSection
        :image="pokemonData?.image"
        :number="pokemonData?.number"
        :name="pokemonData?.name"
        :classification="pokemonData?.classification"
        :max-c-p="pokemonData?.maxCP"
        :flee-rate="pokemonData?.fleeRate"
        :types="pokemonData?.types"
        :resistant="pokemonData?.resistant"
        :weaknesses="pokemonData?.weaknesses"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.evolutionRequirements"
        :pokemon-table-title="'Evolution Requirement'"
        :pokemon-table-header="evolutionTableHeader"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.weight"
        :pokemon-table-title="'Weight Measurement'"
        :pokemon-table-header="measurementTableHeader"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.height"
        :pokemon-table-title="'Height Measurement'"
        :pokemon-table-header="measurementTableHeader"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.attacks?.fast"
        :pokemon-table-title="'Fast Attack'"
        :pokemon-table-header="attackTableHeader"
        :is-array="true"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.attacks?.special"
        :pokemon-table-title="'Special Attack'"
        :pokemon-table-header="attackTableHeader"
        :is-array="true"
      />

      <PokemonTable
        :pokemon-data="pokemonData?.evolutions"
        :pokemon-table-title="'Evolution Line'"
        :pokemon-table-header="evolutionLineTableHeader"
        :is-array="true"
        :is-evolution-line="true"
        :pokemon-table-width="'25%'"
        @btn-action="gotoLink"
      />
    </div>
    <div v-else>
      <h2 class="text-center">Failed to Fetch Data... Please Try Again!</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchPokemonDataListDetail } from "../manager/pokemon";
import PokePageTitle from "../components/base/PokePageTitle.vue";
import PokeButton from "../components/base/PokeButton.vue";
import PokemonDescriptionSection from "../components/PokemonDescriptionSection.vue";
import PokemonTable from "../components/PokemonTable.vue";

const router = useRouter();
const route = useRoute();
const pokemonData = ref(null);
const evolutionTableHeader = ref([
  {
    name: "Name",
    isCenter: false,
  },
  {
    name: "Amount",
    isCenter: false,
  },
]);
const measurementTableHeader = ref([
  {
    name: "Minimum",
    isCenter: false,
  },
  {
    name: "Maximum",
    isCenter: false,
  },
]);
const attackTableHeader = ref([
  {
    name: "Name",
    isCenter: false,
  },
  {
    name: "Type",
    isCenter: true,
  },
  {
    name: "Damage",
    isCenter: false,
  },
]);
const evolutionLineTableHeader = ref([
  {
    name: "Image",
    isCenter: false,
  },
  {
    name: "Name",
    isCenter: true,
  },
  {
    name: "Requirement",
    isCenter: false,
  },
  {
    name: "Detail",
    isCenter: false,
  },
]);
let routeName = ref(route.params.name);
let historyPath = ref([]);

onMounted(() => {
  if (routeName.value !== "") {
    historyPath.value.push(routeName.value);
    fetchPokemonDataByName();
  } else {
    router.push("/");
  }
});

watch(routeName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    fetchPokemonDataByName();
  }
});

const goBack = () => {
  router.back();
  historyPath.value.pop();
  routeName.value = historyPath.value[historyPath.value.length - 1];
  window.scrollTo(0, 0);
};

const gotoCardList = () => {
  router.push("/");
};

const gotoLink = (name) => {
  router.push(`/pokemon-detail/${name}`);
  historyPath.value.push(name);
  routeName.value = name;
  window.scrollTo(0, 0);
};

const fetchPokemonDataByName = () => {
  fetchPokemonDataListDetail({ name: routeName.value })
    .then((response) => {
      const { data } = response.data;
      if (data?.pokemon?.id) {
        pokemonData.value = data.pokemon;
        console.log("cek pokemonData.value : ", pokemonData.value);
      }
      return;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};
</script>

<style lang="css" scoped>
.pokemon-detail {
  color: var(--vt-c-white);
}

.pokemon-detail .pokemon-detail-frame {
  width: 100%;
  max-width: 720px;
  margin: 0% auto;
  background-color: var(--vt-c-black-soft);
  border: 2px solid var(--primary-text-orange);
  border-radius: var(--border-radius);
}

.sticky-position {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--vt-c-black);
  padding-top: 8px;
}
</style>
