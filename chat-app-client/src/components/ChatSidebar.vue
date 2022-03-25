<template>
  <div class="chat-sidebar">
    <div flex class="chat__header">
      <div class="text-center">
        <span>You are logged in as {{ currentUser.fullName }}</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark color="primary" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title
                @click="action(item.type)"
                :style="item.style"
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div flex class="chat__header">
      <div class="text-center">
        <span>{{ heading }}</span>
        <v-menu offset-y>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title :style="item.style">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="chat__sidebar-contents">
      <v-list color="grey lighten-3" class="py-0" two-line>
        <v-list-item-group active-class="active-user">
          <template v-for="item in list">
            <user-list-item
              :user="item"
              :key="item.id"
              @click.native="$emit(selectEvent, item)"
            />
          </template>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import UserListItem from "./UserListItem.vue";
export default {
  components: { UserListItem },

  props: {
    selectEvent: String,
    currentUser: Object,
    list: Array,
    heading: String,
  },

  data() {
    return {
      items: [
        { title: "Logout", type: "logout", style: { cursor: "pointer" } },
      ],
    };
  },
  methods: {
    action(type = "") {
      if (type == "logout") {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin.scss";
.chat {
  &__sidebar {
    height: 100vh;
    width: 25%;
    @include responsive-max("md") {
      display: none;
    }

    .chat__header {
      text-align: center;
    }

    &-contents {
      .v-list-item.active-user {
        background-color: #4fc3f7;
      }
    }
  }
  &-contents {
    .v-list-item.active-user {
      background-color: #4fc3f7;
    }
  }

  &__header {
    text-align: center;
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
