<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
            v-model="search"
        />
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>
    <div  v-for="participant in filterParticipants" :key="participant" class="user">
      <div v-for="user in users" :key="user.id">
        <span v-if="participant === user.username">
          <img v-bind:title="participant" v-bind:src="user.picture_url"/>
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
    <div v-for="user in filterUsers" :key="user.id" class="user">
      <img v-bind:title="user.username" v-bind:src="user.picture_url"/>
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
    ...mapGetters(["conversation", "user", "users"]),
    filterUsers() {
      return this.users.filter(user=>user.username.toLowerCase().includes(this.search.toLowerCase()));
    },
    filterParticipants() {
      return this.conversation.participants.filter(participant=>participant.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    ...mapActions([])
  }
};
</script>

<style src="./Group.css" scoped />
