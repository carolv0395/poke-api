<template>
  <div id="app">
    <h1 id="title">{{ title }}</h1>
    <div
      v-if=" info.length != 0 "
      class="poke-card"
      v-bind:style="{ backgroundColor: info.mainColor }"
    >
      <div class="img-container">
        <img class="pokemon-img" :src="info.imageLink" />
      </div>
      <p>{{ info.name }}</p>
      <p class="description">{{ info.types }}</p>
      <p class="description">{{ info.hp }}</p>
    </div>
    <div v-if=" info.length == 0 " class="no-poke-card">
      <p>Click button bellow to catch your first pokemon</p>
    </div>
    <button class="btn btn-pokemon" ref="button" v-on:click="getPokemon">I choose you!</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      title: "POKEDEX",
      info: []
    };
  },
  methods: {
    getPokemon: function() {
      // there are 807 pokemon in the poke-verse
      const id = Math.floor(Math.random() * 807) + 1;
      // card color scheme
      const colors = {
        fire: "#FDDFDF",
        grass: "#DEFDE0",
        electric: "#FCF7DE",
        water: "#DEF3FD",
        ground: "#f4e7da",
        rock: "#d5d5d4",
        fairy: "#fceaff",
        poison: "#98d7a5",
        bug: "#f8d5a3",
        dragon: "#B494D4",
        psychic: "#eaeda1",
        flying: "#F5F5F5",
        fighting: "#E6E0D4",
        normal: "#F5F5F5",
        ice: "#D7D4D4",
        dark: "#97b3e6",
        steel: "#C5C7C4",
        ghost: "#778899"
      };
      axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(response => {
        const mainType = response.data.types.map(type => type.type)[0].name;
        this.info = {
          name:
            response.data.species.name[0].toUpperCase() +
            response.data.species.name.slice(1),
          types:
            "Type: " +
            response.data.types
              .map(
                type =>
                  type.type.name[0].toUpperCase() + type.type.name.slice(1)
              )
              .join(", "),
          hp: "HP: " + response.data.stats.map(stat => stat.base_stat)[0],
          imageLink: response.data.sprites.front_default,
          mainColor: colors[mainType]
        };
      });
    }
  }
};
</script>

<style>
#app {
  margin: 30px;
}
</style>