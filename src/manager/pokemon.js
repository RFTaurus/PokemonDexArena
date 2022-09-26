import axios from "axios";

export function fetchPokemonDataList({ totalData }) {
  const axiosConfig = {
    url: `https://graphql-pokemon2.vercel.app/`,
    headers: {},
    method: "post",
    data: {
      query: `
        query fetchPokemonDataList(
          $first: Int!
        ) {
          pokemons(first: $first) {
            id
            number
            name
            maxCP
            types
            image
          }
        }
      `,
      variables: {
        first: totalData ? totalData : 16,
      },
    },
  };
  return axios(axiosConfig);
}

export function fetchPokemonDataListByName({ name }) {
  const axiosConfig = {
    url: `https://graphql-pokemon2.vercel.app/`,
    headers: {},
    method: "post",
    data: {
      query: `
        query fetchPokemonDataListByName(
          $name: String
        ) {
          pokemon(name: $name) {
            id
            number
            name
            maxCP
            types
            image
          }
        }
      `,
      variables: {
        name,
      },
    },
  };
  return axios(axiosConfig);
}

export function fetchPokemonDataListDetail({ name }) {
  const axiosConfig = {
    url: `https://graphql-pokemon2.vercel.app/`,
    headers: {},
    method: "post",
    data: {
      query: `
        query fetchPokemonDataList(
          $name: String
        ) {
          pokemon(name: $name) {
            id
            number
            name
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
            classification
            types
            resistant
            attacks {
              fast {
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
            weaknesses
            fleeRate
            maxCP
            evolutions {
              id
              name
              evolutionRequirements {
                amount
                name
              }
              image
            }
            evolutionRequirements {
              name
              amount
            }
            image
          }
        }
      `,
      variables: {
        name,
      },
    },
  };
  return axios(axiosConfig);
}
