<template>
  <div class="community">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
            v-model="search"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div class="users">

      <div class="user" v-for="user in filterUsers" :key="user.username" :class="{}">
       <img v-bind:src="user.picture_url"/>
        <span class="" >{{ user.username }}</span>
      </div>
      
    </div>

    <div class="actions">
      <button class="ui primary big button" @click="openConversation">
        <i class="conversation icon"></i>
        <span>
          Ouvrir la conversation (2)
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Community",
  data() {
    return {
      selectedUsers:[],
      search: "",
    };
  },
  methods: {
    ...mapActions(["createOneToOneConversation"]),
    openConversation() {
      let promise = this.createOneToOneConversation("Alice");

      promise.finally(() => {
        console.log("Conversation ouverte !");
      });

      /*toggleSelected(username) {

      };
      isSelected(username) {

      }*/
    }
  },
  computed: {
    ...mapGetters(["users"]),
    filterUsers() {
      return this.users.filter(user=>user.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  }
};
</script>

<style src="./Community.css" scoped />
