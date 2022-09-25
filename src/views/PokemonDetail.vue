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
      <div class="row justify-content-center my-4">
        <div class="col-12">
          <div class="text-center my-4">
            <div class="pokedex-image-wrapper">
              <img
                class="pokedex-image"
                :src="getImageUrl(pokemonData?.image)"
                alt="Pokemon"
              />
            </div>
          </div>
        </div>
        <div class="col-12 detail-content text-center">
          <p class="text-pokemon-title">Number:</p>
          <p class="text-pokemon-name">No. {{ pokemonData?.number }}</p>
          <p class="text-pokemon-title">Name:</p>
          <p class="text-pokemon-name">{{ pokemonData?.name }}</p>
          <p class="text-pokemon-title">Classification:</p>
          <p class="text-pokemon-name">{{ pokemonData?.classification }}</p>
          <br />
          <p class="text-pokemon-title">Max CP:</p>
          <p class="text-pokemon-cp">{{ pokemonData?.maxCP }}</p>
          <p class="text-pokemon-title">Flee Rate:</p>
          <p class="text-pokemon-cp">{{ pokemonData?.fleeRate }}</p>
          <br />
          <p class="text-pokemon-title">Type:</p>
          <PokeChip
            :chip-types="pokemonData?.types"
            :custom-class="'justify-content-center'"
          />
          <p class="text-pokemon-title">resistant:</p>
          <PokeChip
            :chip-types="pokemonData?.resistant"
            :custom-class="'justify-content-center'"
          />
          <p class="text-pokemon-title">Weakness:</p>
          <PokeChip
            :chip-types="pokemonData?.weaknesses"
            :custom-class="'justify-content-center'"
          />
        </div>
      </div>

      <div v-if="pokemonData?.evolutionRequirements">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Evolution Requirement</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Name</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>{{ pokemonData?.evolutionRequirements?.name || "-" }}</td>
                <td class="text-pokemon-number">
                  {{ pokemonData?.evolutionRequirements?.amount || "-" }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-else>
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Evolution Requirement</p>
            <p class="text-pokemon-exception">No Evolution Requirement</p>
          </div>
        </div>
      </div>

      <div v-if="pokemonData?.weight">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Weight</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Measurement</th>
                <th>Weight</th>
              </tr>
              <tr>
                <td>Minimum</td>
                <td class="text-pokemon-number">
                  {{ pokemonData?.weight?.minimum }}
                </td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td class="text-pokemon-number">
                  {{ pokemonData?.weight?.maximum }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div v-if="pokemonData?.height">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Height</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Measurement</th>
                <th>Height</th>
              </tr>
              <tr>
                <td>Minimum</td>
                <td class="text-pokemon-number">
                  {{ pokemonData?.height?.minimum }}
                </td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td class="text-pokemon-number">
                  {{ pokemonData?.height?.maximum }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div v-if="pokemonData?.attacks?.fast">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Fast Attack</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Name</th>
                <th class="th-special">Type</th>
                <th>Damage</th>
              </tr>
              <tr
                v-for="(attack, index) in pokemonData.attacks.fast"
                :key="index"
              >
                <td>{{ attack.name }}</td>
                <td>
                  <PokeChip :chip-types="[attack.type]" />
                </td>
                <td class="text-pokemon-number">{{ attack.damage }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div v-if="pokemonData?.attacks?.special">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Special Attack</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Name</th>
                <th class="th-special">Type</th>
                <th>Damage</th>
              </tr>
              <tr
                v-for="(attack, index) in pokemonData.attacks.special"
                :key="index"
              >
                <td>{{ attack.name }}</td>
                <td>
                  <PokeChip :chip-types="[attack.type]" />
                </td>
                <td class="text-pokemon-number">{{ attack.damage }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div v-if="pokemonData?.attacks?.special">
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Special Attack</p>
          </div>
          <div class="col-12 detail-content">
            <table class="attack-table text-left">
              <tr class="table-header">
                <th>Name</th>
                <th class="th-special">Type</th>
                <th>Damage</th>
              </tr>
              <tr
                v-for="(attack, index) in pokemonData.attacks.special"
                :key="index"
              >
                <td>{{ attack.name }}</td>
                <td>
                  <PokeChip :chip-types="[attack.type]" />
                </td>
                <td class="text-pokemon-number">{{ attack.damage }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div
        v-if="pokemonData?.evolutions && pokemonData?.evolutions?.length !== 0"
      >
        <br />
        <div class="row">
          <div class="col-12 detail-content">
            <p class="text-pokemon-highlight">Evolution Line</p>
          </div>
          <div class="col-12 detail-content">
            <table class="evolution-line-table text-left">
              <tr class="table-header">
                <th>Image</th>
                <th>Name</th>
                <th>Requirement</th>
                <th>Detail</th>
              </tr>
              <tr
                v-for="(evolution, index) in pokemonData.evolutions"
                :key="index"
              >
                <td>
                  <div class="text-center my-4">
                    <div class="pokedex-image-evolution-line-wrapper">
                      <img
                        class="pokedex-image"
                        :src="getImageUrl(evolution?.image)"
                        alt="Pokemon"
                      />
                    </div>
                  </div>
                </td>
                <td>{{ evolution.name }}</td>
                <td>
                  {{
                    evolution?.evolutionRequirements?.name
                      ? evolution?.evolutionRequirements.name
                      : "-"
                  }}
                  <span class="text-pokemon-evolution-highlight">
                    {{
                      evolution?.evolutionRequirements?.amount
                        ? `(${evolution?.evolutionRequirements?.amount}x)`
                        : ""
                    }}
                  </span>
                </td>
                <td class="text-center">
                  <PokeButton
                    :btn-text="'Check'"
                    @btn-action="gotoLink(evolution.name)"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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
import PokeChip from "../components/base/PokeChip.vue";

const router = useRouter();
const route = useRoute();
const pokemonData = ref(null);
const defaultImage = ref("../assets/pokedex-logo.png");
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
};

const gotoCardList = () => {
  router.push("/");
};

const gotoLink = (name) => {
  router.push(`/pokemon-detail/${name}`);
  historyPath.value.push(name);
  routeName.value = name;
};

const getImageUrl = (image = defaultImage.value) => {
  return new URL(image, import.meta.url).href;
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

.pokedex-image-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 240px;
}

.pokedex-image-evolution-line-wrapper {
  display: inline-block;
  width: 100%;
  max-width: 128px;
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

.detail-content .text-pokemon-number {
  color: var(--primary-text-orange);
  font-size: 1em;
  font-weight: bold;
}

.detail-content .text-pokemon-highlight {
  color: var(--primary-text-orange);
  font-size: 1.3em;
  font-weight: bold;
}

.detail-content .text-pokemon-evolution-highlight {
  color: var(--primary-text-orange);
  font-size: 0.9em;
  font-weight: bold;
}

.detail-content .text-pokemon-exception {
  color: var(--vt-c-white);
  font-size: 1.1em;
  font-weight: bold;
}

.detail-content .evolution-line-table,
.detail-content .attack-table {
  border-collapse: collapse;
  width: 100%;
}

.detail-content .table-header {
  font-size: 1.2em;
  font-weight: bold;
}

.detail-content table th,
.detail-content table td {
  font-size: 0.8em;
  width: 33.33%;
  border: 1px solid var(--vt-c-white-mute);
  padding: var(--padding-gap-half);
}

.detail-content table.evolution-line-table th,
.detail-content table.evolution-line-table td {
  font-size: 0.8em;
  width: 25%;
  border: 1px solid var(--vt-c-white-mute);
  padding: var(--padding-gap-half);
}

.detail-content .evolution-line-table th,
.detail-content .attack-table th {
  text-align: left;
  background-color: var(--primary-text-orange);
  color: var(--vt-c-black);
  font-weight: bold;
}

@media (min-width: 768px) {
  .detail-content {
    justify-content: space-between;
  }

  .detail-content .text-pokemon-number {
    color: var(--primary-text-orange);
    font-size: 1.2em;
    font-weight: bold;
  }

  .detail-content table th,
  .detail-content table td {
    font-size: 1.2em;
    width: 33.33%;
  }
}

@media (min-width: 1024px) {
  .detail-content table .th-special {
    text-align: center;
  }
}
</style>
