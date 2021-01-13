<template>
  <div class="sidebar">
    <div class="user">
      <div class="user-picture">
        <img :src="user.picture_url" class="ui circular image" />
      </div>

      <div class="user-info">
        <div class="user-info-pseudo">{{ user.username }}</div>

        <div class="user-info-status ui simple dropdown">
          <div class="available text">
            En ligne
          </div>
          <i class="dropdown icon"> </i>
          <div class="menu">
            <div class="item" @click="deauthenticate">
              <i class="logout icon"> </i>
              Déconnexion
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menu">
      <div class="blue button" @click="openCommunity">
        <i class="users icon"> </i>
        <br />
        <span>Communauté</span>
      </div>
      <div v-if="true" class="blue button" @click="openMessageSearch">
        <i class="search icon"> </i>
        <br />
        <span>Messages</span>
      </div>
    </div>
    <div class="conversations">
      <div class="conversation-search">
        <div class="ui fluid search">
          <div class="ui icon input">
            <input
              class="prompt"
              placeholder="Rechercher une conversation"
              type="text"
              v-model="search"
            />
            <i class="search icon"> </i>
          </div>
        </div>
      </div>
      <div v-for="conversation in filterConversations" :key="conversation.id">
        <div v-if="conversation.participants.length >2" class="conversation new"  @click="openConversation(conversation.id)">
          <a class="avatar">
            <span>
              <i class="users icon"></i>
            </span>
          </a>
          <div class="content">
            <div class="metadata">
              <div class="title"><i class="ui small icon circle"> </i>Groupe : <span>{{conversation.title}}</span></div>
              <span class="time">{{conversation.updated_at}}</span>
            </div>
            <div class="text">{{ (conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].content : "Pas de message pour l'instant")}}</div>
          </div>
        </div>
        <div v-if="conversation.participants.length <=2" class="conversation new"  @click="openConversation(conversation.id)">
          <a class="avatar">
            <img v-bind:src="conversation.avatar" />
          </a>
          <div class="content">
            <div class="metadata">
              <div class="title"><i class="ui small icon circle"> </i>{{conversation.participants[1]}}</div>
              <span class="time">{{conversation.updated_at}}</span>
            </div>
            <div class="text">{{ (conversation.messages.length > 0  ? conversation.messages[conversation.messages.length - 1].content : "Pas de message pour l'instant")}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    ...mapActions(["deauthenticate"]),
    openCommunity() {
      router.push({ name: "Community" });
    },
    openMessageSearch() {
      router.push({ name: "Search" });
    },
    openConversation(id) {
      router.push({ name: "Conversation", params: { id } });
    }
  },
  computed: {
    ...mapGetters(["user", "conversations"]),
    filterConversations() {
      return this.conversations.filter(conversation=>conversation.participants[1].toLowerCase().includes(this.search.toLowerCase())).sort(function(conversation_a, conversation_b){return new Date(conversation_b.updated_at) - new Date(conversation_a.updated_at); });
      //test 2
      
      //return this.users.filter(user=>user.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  }
};
</script>

<style scoped src="./Sidebar.css" />
