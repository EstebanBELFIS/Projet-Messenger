import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticating: false,
    user: {
      username: null,
      token: null,
      picture_url: null
    },
    users: [],
    conversations: [],
    currentConversationId: null,
    usersAvailable: [],
    search: ""
  },
  getters: {
    authenticating(state) {
      return state.authenticating;
    },
    authenticated(state) {
      return state.user.token !== null;
    },
    user(state) {
      return state.user;
    },

    // getUserPicture(state, username) {
    //   state.users.forEach((element) => {
    //     console.log(element);
    //     if (element === username) {
    //       return element.picture_url;
    //     }
    //   });
    // },

    users(state) {
      return state.users.map((user) => ({
        ...user
        //TODO
      }));
    },
    conversations(state) {
      return state.conversations.map((conversation) => {
        const other_usernames = conversation.participants.filter(
          (username) => username !== state.user.username
        );
        return {
          ...conversation,
          avatar:
            conversation.type === "one_to_one"
              ? state.users.find((user) => user.username === other_usernames[0])
                  .picture_url
              : "https://www.sfav.org/image/Presentation_Sans.png",
          title:
            conversation.type === "one_to_one"
              ? other_usernames[0]
              : other_usernames.join(", ")
        };
      });
    },
    conversation(state, getters) {
      let conversation = state.conversations.filter(
        (conversation) => conversation.id === state.currentConversationId
      )[0];
      const other_usernames = conversation.participants.filter(
        (username) => username !== state.user.username
      );
      return {
        ...conversation,
        avatar:
          conversation.type === "one_to_one"
            ? state.users.find((user) => user.username === other_usernames[0])
                .picture_url
            : "https://www.sfav.org/image/Presentation_Sans.png",
        title:
            conversation.type === "one_to_one"
              ? other_usernames[0]
              : other_usernames.join(", ")
      };
    }
  },
  mutations: {
    syncCurrentConversation(state, conversationId) {
      state.currentConversationId = conversationId;
    },
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { username, token, picture_url }) {
      Vue.set(state.user, "username", username);
      Vue.set(state.user, "token", token);
      Vue.set(state.user, "picture_url", picture_url);
    },
    setUsers(state, users) {
      state.users = users;
    },

    setConversations(state, conversations) {
      state.conversations = conversations;
    },

    upsertUser(state, { user }) {
      const localUserIndex = state.users.findIndex(
        (_user) => _user.username === user.username
      );

      if (localUserIndex !== -1) {
        Vue.set(state.users, localUserIndex, user);
      } else {
        state.users.push({
          ...user
        });
      }
    },

    upsertConversation(state, { conversation }) {
      const localConversationIndex = state.conversations.findIndex(
        (_conversation) => _conversation.id === conversation.id
      );

      if (localConversationIndex !== -1) {
        Vue.set(state.conversations, localConversationIndex, conversation);
      } else {
        state.conversations.push({
          ...conversation
        });
      }
    },
    upsertMessage(state, { conversation_id, message }) {
      console.log('conversation id' + conversation_id);
      let conversation = state.conversations.filter(
        (conversation) => conversation.id === conversation_id
      )[0];

      conversation.messages.push({
        ...message
      });
    },
    removeMessage(state, { conversation_id, message_id }) {
      let conversation = state.conversations.filter(
        (conversation) => conversation.id === conversation_id
      )[0];
      let messageDeleted = conversation.messages.filter(
        (message) => message.id === message_id
      )[0];
      messageDeleted.content = '<i> Message Supprimé</i>';
    },
    upsertReaction(state, { conversation_id, message }) {
      console.log('conversation id' + conversation_id);
      let messageId = message.id;
      let conversation = state.conversations.filter(
        (conversation) => conversation.id === conversation_id
      )[0];
      let messageReact = conversation.messages.filter(
        (message) => message.id === messageId
      )[0];

      messageReact.reactions = message.reactions;

    }
  },
  actions: {
    authenticate({ commit, dispatch }, { username, password }) {
      if (!username || !password) {
        return;
      }
      commit("setAuthenticating", true);
      Vue.prototype.$client
        .authenticate(username, password)
        .then((user) => {
          commit("setUser", user);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          dispatch("initializeAfterAuthentication");
        })
        .catch(() => {
          alert("Erreur d'authentification !");
        })
        .finally(() => {
          commit("setAuthenticating", false);
        });
    },

    deauthenticate() {
      localStorage.removeItem("password");
      window.location.reload();
    },

    initializeAfterAuthentication({ dispatch }) {
      dispatch("fetchUsers");
      dispatch("fetchConversations");
    },

    fetchUsers({ commit }) {
      Vue.prototype.$client.getUsers().then(({ users }) => {
        commit("setUsers", users);
      });
    },
    fetchConversations({ commit }) {
      Vue.prototype.$client.getConversations().then(({ conversations }) => {
        commit("setConversations", conversations);
      });
    },

    createOneToOneConversation({ commit }, username) {
      const promise = Vue.prototype.$client.getOrCreateOneToOneConversation(
        username
      );

      promise.then(({ conversation }) => {
        commit("upsertConversation", {
          conversation
        });

        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promise;
    },

    CreateConversation({ commit }, usernames) {
      const promise = Vue.prototype.$client.createManyToManyConversation(
        usernames
      );

      promise.then(({ conversation }) => {
        commit("upsertConversation", {
          conversation
        });

        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promise;
    },
    postMessage({ commit }, { conversationId, content }) {
      const promise = Vue.prototype.$client.postMessage(
        conversationId,
        content
      );
    },
    reactMessage({ commit }, { conversationId, messageId, reaction }) {
      const promise = Vue.prototype.$client.reactMessage(
        conversationId,
        messageId,
        reaction
      );
    },
    deleteMessage({ commit }, { conversationId, messageId }) {
      const promise = Vue.prototype.$client.deleteMessage(
        conversationId,
        messageId
      );
    }
  }
});
