<template>
  <div class="conversation">
    <div class="conversation-header">
      <!--      <img-->
      <!--        class="avatar"-->
      <!--        src="https://source.unsplash.com/FUcupae92P4/100x100"-->
      <!--      />-->
         <div v-if="conversation.participants.length <=2">
            <img class="avatar" v-bind:src="conversation.avatar" />
      </div>
      <div v-if="conversation.participants.length >2">
          <div class="avatar">
            <i class="ui users icon"></i>
          </div>
      </div>

      <div class="title">
        <div class="ui compact">
          <i class="icon circle"></i>
          
          <span >
            {{this.conversation.title}}
          </span>
          <div class="ui simple dropdown item">
            <i class="vertical ellipsis icon"></i>

            <div class="menu">
              <div v-if="true" class="item">
                <i class="ui icon paint brush"></i>
                Modifier le thème
              </div>
              <div v-if="true" class="item">
                <i class="ui icon edit"></i>
                Modifier le titre
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell slash"></i>
                Mettre en sourdine
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell"></i>
                Rétablir les notifications
              </div>
              <div class="item" @click="groupPanel = !groupPanel">
                <i class="ui icon users"></i>
                Gérer les participants
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conversation-container">
      <div class="conversation-main">
        <div class="conversation-body" id="scroll">
          <div class="wrapper">
            <span v-for="message in this.conversation.messages" :key="message.id">
            <div class="time">{{message.posted_at.slice(11,16)}}</div>
            <div class="message" v-bind:class="[message.from == user.username ? 'mine' : '']">
              <span v-for="convUser in users" :key="convUser.id"> <span v-if="message.from == convUser.username">  <img
                v-bind:title="message.from"
                v-bind:src="convUser.picture_url"
              /></span> </span>
              <div class="bubble top bottom" :id="'message_'+message.id" v-html="message.content" > </div>
              <div class="reacts">
                <span v-for="react in message.reactions" :key="react">
                  <span v-if="react == 'HEART'">
                    <i title="Aimer" class="circular heart outline icon" :id="'heart_reacts_' + message.id"></i>
                  </span>
                  <span v-if="react == 'THUMB'">
                    <i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon" :id="'thumb_reacts_' + message.id"></i>
                  </span>
                  <span v-if="react == 'HAPPY'">
                    <i title="Content" class="circular smile outline icon"  :id="'happy_reacts_' + message.id"></i>
                  </span>
                  <span v-if="react == 'SAD'">
                    <i
                    title="Pas content"
                    class="circular frown outline icon" :id="'sad_reacts_' + message.id"></i>
                  </span>
                </span>
              </div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon" @click="deleteThisMessage(message.id)"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
                <div class="controls">
               <span class="react"
                  ><i title="Aimer" class="circular heart outline icon"  @click="reactToMessage(message.id,'HEART');"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                     @click="reactToMessage(message.id,'THUMB');"
                  ></i
                  ><i title="Content" class="circular smile outline icon"  @click="reactToMessage(message.id,'HAPPY');"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                    @click="reactToMessage(message.id,'SAD');"
                  ></i
                ></span>
              </div>
              </div>
            </div>
            </span>
            <!-- <div class="time">01:32:14</div>
            <div class="message">
              <img
                title="Bob"
                src="https://source.unsplash.com/7omHUGhhmZ0/100x100"
              />
              <div class="bubble top bottom">Hello !</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="message">
              <img
                title="Alice"
                src="https://source.unsplash.com/mK_sjD0FrXw/100x100"
              />
              <div class="bubble top bottom">Coucou !</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="time">01:32:31</div>
            <div class="message mine">
              <div class="bubble top bottom">Vous allez bien ?</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="time">01:32:38</div>
            <div class="message">
              <img
                title="Alice"
                src="https://source.unsplash.com/mK_sjD0FrXw/100x100"
              />
              <div class="bubble top bottom">Oui ça va et toi ?</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="time">01:32:48</div>
            <div class="message mine">
              <div class="bubble top">Ca va super !</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="message mine">
              <div class="bubble middle">
                Je viens de découvrir ce nouveau chat
              </div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="message mine">
              <div class="bubble bottom">C'est vraiment chouette</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="time">01:33:32</div>
            <div class="message">
              <div class="bubble top">Oui je l'aime beaucoup aussi</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="message">
              <div class="bubble middle">
                <p class="reply_content">C'est vraiment chouette</p>
                On peut répondre à un message
              </div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="message">
              <img
                title="Bob"
                src="https://source.unsplash.com/7omHUGhhmZ0/100x100"
              />
              <div class="bubble bottom">Ou bien y réagir</div>
              <div class="reacts">
                <i title="Aimer" class="circular heart outline icon">1</i>
              </div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="message">
              <img
                title="Alice"
                src="https://source.unsplash.com/mK_sjD0FrXw/100x100"
              />
              <div class="bubble top bottom">
                On peut même éditer ou supprimer des messages !
              </div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="view">
              <img
                title="Vu par Bob à 01:35:50"
                src="https://source.unsplash.com/7omHUGhhmZ0/100x100"
              />
            </div>

            <div class="time">01:36:24</div>
            <div class="message mine">
              <div class="bubble top bottom">
                Et on peut voir qui a vu un message ou non ?
              </div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="time">01:36:31</div>
            <div class="message">
              <img
                title="Alice"
                src="https://source.unsplash.com/mK_sjD0FrXw/100x100"
              />
              <div class="bubble top bottom">Oui !</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon"></i
                ><span class="react"
                  ><i title="Aimer" class="circular heart outline icon"></i
                  ><i
                    title="Pouce en l'air"
                    class="circular thumbs up outline icon"
                  ></i
                  ><i title="Content" class="circular smile outline icon"></i
                  ><i
                    title="Pas content"
                    class="circular frown outline icon"
                  ></i
                ></span>
              </div>
            </div>
            <div class="time">01:36:38</div>
            <div class="message mine">
              <div class="bubble top bottom">Incroyable !</div>
              <div class="reacts"></div>
              <div class="controls">
                <i title="Supprimer" class="circular trash icon"></i
                ><i title="Editer" class="circular edit icon"></i
                ><i title="Répondre" class="circular reply icon"></i>
              </div>
            </div>
            <div class="view">
              <img
                title="Vu par Alice à 01:36:39"
                src="https://source.unsplash.com/mK_sjD0FrXw/100x100"
              /><img
                title="Vu par Gael à 01:36:39"
                src="https://source.unsplash.com/OYH7rc2a3LA/100x100"
              />
            </div>
          </div>
        </div>

        <div class="typing">
          <div class="wrapper">
            Alice est en train d'écrire...
          </div>
        </div>
        <div class="conversation-footer">
          <div class="wrapper">
            <p>
              <i title="Abandonner" class="circular times small icon link"></i>
              Répondre à Alice :
              <span>
                On peut même éditer ou supprimer des messages !
              </span>
            </p> -->

            <div class="ui fluid search">
              <div class="ui icon input">
                <input
                  class="prompt"
                  type="text"
                  placeholder="Rédiger un message"
                  name = "message-content"
                />
                <button class="ui primary big button bubble" @click="sendMessage"><i class="send icon" ></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="conversation-sidebar" v-if="groupPanel">
        <Group />
      </div>
    </div>
  </div>
</template>

<script>
import Group from "@/components/Group/Group";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Conversation",
  components: { Group },
  data() {
    return {
      groupPanel: false
    };
  },
  mounted() {
    this.scrollBottom();
  },
  updated() {
    this.scrollBottom();
  },
  computed: {
    ...mapGetters(["conversation", "user","users"])
  },
  methods: {
    ...mapActions([]),
    ...mapActions(["postMessage","reactMessage", "deleteMessage"]),
    scrollBottom() {
      setTimeout(() => {
        let scrollElement = document.querySelector("#scroll");
        if (scrollElement) {
          scrollElement.scrollTop = document.querySelector(
            "#scroll"
          ).scrollHeight;
        }
      }, 0);
    },
    sendMessage() {
      console.log(this.conversation.messages);
      let promise = "";
      let conversationId = this.conversation.id;
      let content = document.querySelector("input[name=message-content]").value;
      promise = this.postMessage({conversationId,content});
       promise.finally(() => {
            console.log(promise);
            console.log(this.conversation);
            document.querySelector("input[name=message-content]").value = '';
      });
    },
    refreshPage() {

    },

    reactToMessage(messageId,reaction) {
      let promise = "";
      let conversationId = this.conversation.id;
      promise = this.reactMessage({conversationId,messageId,reaction});
    },
    deleteThisMessage(messageId) {
      let promise = "";
      let conversationId = this.conversation.id;
      promise = this.deleteMessage({conversationId,messageId});
      }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    conversation(newConversation, oldConversation) {
      this.scrollBottom();
    }
  }
};
</script>

<style src="./Conversation.css" scoped />
