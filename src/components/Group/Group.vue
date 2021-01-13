<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
          type="text"
          placeholder="Rechercher un utilisateur"
          class="prompt"
        /><i class="search icon"></i>
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>
    <div v-for="participant in conversation.participants" :key="participant" class="user">
      <div v-for="user in users" :key="user.id"> 
        <span v-if="participant === user.username">  
          <img title="Alice" v-bind:src="user.picture_url"/>
          <span>{{participant}}</span>
        </span>
      </div>
      <br />
      <i class="nickname"></i>
      <i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
      ></i>
    </div>
    <div class="spanner">
      <hr />
      <span>Communauté</span>
      <hr />
    </div>
    <div  v-for="user in users" :key="user.id" class="user">
      <img title="Alice" v-bind:src="user.picture_url"/>
      <span>{{user.username}}</span>
      <br />
      <i class="nickname"></i>
      <i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Group",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters(["conversation", "user", "users"])
  },
  methods: {
    ...mapActions([])
  }
};
</script>

<style src="./Group.css" scoped />
