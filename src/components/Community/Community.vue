<template>
  <div class="community">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div class="users">
      <div v-for="user in users" :key="user.username" class="user" :class="{selected:selectedProfiles.includes(user.username)}" @click="selectedProfiles.includes(user.username) ? selectedProfiles.splice(selectedProfiles.indexOf(user.username), 1) : selectedProfiles.push(user.username)">
        <img v-bind:src="user.picture_url" />
        <span class="">{{ user.username }}</span>
      </div>
    </div>

    <div class="actions">
      <button class="ui primary big button" @click="openConversation">
        <i class="conversation icon"></i>
        <span>
          Ouvrir la conversation ({{this.selectedProfiles.length}})
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Community",
  data() {
    return {
      selectedProfiles : [

      ] 
    };
  },
  methods: {
    ...mapActions(["createOneToOneConversation"]),
    openConversation() {
      let promise = this.createOneToOneConversation("Alice");

      promise.finally(() => {
        console.log("Conversation ouverte !");
      });
    }
  },
  computed: {
    ...mapGetters(["users"])
  }
};
</script>

<style src="./Community.css" scoped />
