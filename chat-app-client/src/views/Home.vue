<template>
  <div class="chat">
    <chat-sidebar
      :list="users"
      :currentUser="currentUser"
      heading="Available users"
      @selectConversation="selectConversation"
      selectEvent="selectConversation"
    ></chat-sidebar>

    <chat-window
      :userId="currentUser.id"
      :currentUser="currentUser"
      :friend="friend"
      :chatMessages="messages"
      @MessageReceived="receivedMessage"
    ></chat-window>
  </div>
</template>

<script>
import ChatSidebar from "../components/ChatSidebar.vue";
import ChatWindow from "../components/ChatWindow.vue";
import api from "../mixins/chatApi";

export default {
  name: "HomeView",

  components: {
    ChatSidebar,
    ChatWindow,
  },

  data() {
    return {
      selected: 0,
      users: [],
      friendId: 2,
      currentUser: {},
      chatMessages: [],
      friend: {},
    };
  },

  mixins: [api],

  created() {
    const vm = this;
    vm.currentUser = JSON.parse(
      decodeURIComponent(localStorage.getItem("user"))
    );
  },

  async mounted() {
    const vm = this;

    await vm.getAllFriendsByUserId();
    setTimeout(function(){
      vm.friend = vm.users[0];
      vm.friendId = vm.friend.id;
    }, 100);
  },

  methods: {
    receivedMessage(message) {
      const vm = this;
      vm.chatMessages.push(message);
    },

    async selectConversation(data) {
      const vm = this;
      vm.friendId = data.id;
      vm.friend = data;

      vm.axios
        .get(
          `${vm.api.GetUsersChatByUserId}/${vm.currentUser.id}/${vm.friendId}`
        )
        .then((response) => {
          vm.chatMessages = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getAllFriendsByUserId() {
      const vm = this;
      vm.axios
        .get(`${vm.api.GetAllFriendsByUserId}/${vm.currentUser.id}`)
        .then((response) => {
          vm.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    messages: {
      get: function () {
        return this.chatMessages ? this.chatMessages : [];
      },
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
