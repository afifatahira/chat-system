<template>
  <div>
    <v-list-item>
      <v-list-item-avatar size="50">
        <v-img
          :src="'https://cdn.vuetifyjs.com/images/lists/' + user.id + '.jpg'"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="font-weight-medium">{{
          user.fullName
        }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-icon x-small color="green">mdi-circle</v-icon> Online
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.v-list-item.active-user {
  background-color: #90caf94a !important;
}

.list-item {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light-grey);
}
</style>
