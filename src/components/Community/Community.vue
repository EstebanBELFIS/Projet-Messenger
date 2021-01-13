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
      <div v-for="user in filterUsers" :key="user.username"  class="user" :class="{selected:selectedProfiles.includes(user.username)}" @click="selectedProfiles.includes(user.username) ? selectedProfiles.splice(selectedProfiles.indexOf(user.username), 1) : selectedProfiles.push(user.username)">
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
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Community",
  data() {
    return {
      selectedProfiles : [

      ] ,
      search: "",
    };
  },
  methods: {
    ...mapActions(["createOneToOneConversation"]),
    ...mapActions(["CreateConversation"]),
    // ...mapGetters(["getUserPicture"]),
    openConversation() {
      let promise = "";
      if(this.selectedProfiles.length >1){
          promise = this.CreateConversation(this.selectedProfiles);
          console.log("Plusieurs users séléctionnés !");
          promise.finally(() => {
            console.log("Conversation ouverte !");
          });
      }
      else if(this.selectedProfiles.length === 1){
          promise = this.createOneToOneConversation(this.selectedProfiles[0]);
          console.log(this.selectedProfiles);
          console.log("Un seul user séléctionnés !");
          // getUserPicture(this.selectedProfiles);
          promise.finally(() => {
            console.log("Conversation ouverte !");
          });
      }
      else{
        console.log("Veuillez séléctionner au moins une personne !");
      }

      

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
