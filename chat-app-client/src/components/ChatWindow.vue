<template>
  <div class="chat__body">
    <v-app-bar
      elevation="0"
      color="grey lighten-4 flex-grow-0"
      dense
      dark
      height="60"
    >
      <v-toolbar-title class="black--text"><v-avatar size="50">
          <v-img
            alt="Avatar"
            :src="
              'https://cdn.vuetifyjs.com/images/lists/' + friend.id + '.jpg'
            "
          ></v-img>
        </v-avatar><span class="chat__header-box">{{ friend.fullName }}</span></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <div class="chat__body-messages" v-if="chatMessages.length">
      <div v-for="message in chatMessages" :key="message.id">
        <chat-message :message="message" :userId="userId"></chat-message>
      </div>
    </div>
    <div v-else class="chat__body-message">
      <p class="text-center">No message yet!</p>
    </div>

    <div class="chat__body-input">
      <v-textarea
        v-model="currentMessage"
        label="Type a message"
        auto-grow
        class="rounded-0"
        outlined
        rows="1"
        row-height="15"
        hide-details
      ></v-textarea>
      <v-btn
        depressed
        class="chat__body-btn"
        color="primary"
        @click="sendMessage"
      >
        Send
      </v-btn>
    </div>
  </div>
</template>

<script>
import api from "../mixins/chatApi";
import signalr from "../mixins/signalR";
import ChatMessage from "../components/ChatMessage.vue";

export default {
  components: {
    ChatMessage,
  },

  props: {
    userId: Number,
    currentUser: Object,
    friend: Object,
    chatMessages: Array,
  },

  mixins: [api, signalr],

  data() {
    return {
      currentMessage: "",
    };
  },

  methods: {
    sendMessage() {
      const vm = this;

      vm.axios
        .post(vm.api.SendMessage, {
          sender: vm.userId,
          receiver: vm.friend.id,
          message: vm.currentMessage,
        })
        .then((response) => {
          vm.currentMessage = "";
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin.scss";
.chat {
  height: 100vh;
  background-color: var(--color-light-grey);
  overflow: hidden;
  display: flex;
  justify-content: stretch;

    @include responsive-max("md") {
      width: 100%;
    }


  &__body {
    &-messages {
      overflow-y: auto;
    }
    width: 50%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fafafa;
    border: 1px solid var(--color-grey);
    height: 100vh;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px;

    @include responsive-max("md") {
      width: 100%;
    }

    .online-status {
      margin-bottom: 0;
      font-size: 0.875rem;
    }

    &-input {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-btn {
      height: 100% !important;
      border-radius: 0 !important;
    }
  }

  &__header-box {
    margin: 10px;
  }

  &__header {
    height: 50px;
    border-bottom: 1px solid var(--color-grey);
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: center;

    &-title {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: capitalize;
      color: var(--color-black);
    }
  }
}
</style>
