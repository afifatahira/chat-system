<template>
  <v-card class="auth-card" rounded flat width="100%">
    <v-alert v-if="alert" :type="alertType">
      {{ alertMeassage }}
    </v-alert>
    <v-card-text>
      <v-container fluid>
        <v-row class="auth-row">
          <v-col cols="12" sm="6">
            <v-card-title
              class="text-h5 px-0 mb-2 font-weight-bold black--text"
            >
              Login
            </v-card-title>
            <v-text-field
              v-model="form.email"
              @keyup="clearData()"
              @keyup.enter="submitForm()"
              label="Email"
              placeholder="Enter your email address"
              outlined
              dense
              type="email"
              hide-details
              class="mb-4"
              v-validate="'required|email'"
              name="email"
            ></v-text-field>
            <p v-show="errors.has('email')" class="font-weight-regular danger">
              {{ errors.first("email") }}
            </p>
            <div>
              <v-btn
                @click="submitForm()"
                class="mb-2"
                depressed
                color="primary"
                >Login</v-btn
              >

              <p class="font-weight-medium">
                Not yet a member?
                <router-link to="/register">Register Here</router-link>
              </p>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img src="@/assets/images/welcome.svg"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import api from "../mixins/chatApi";

export default {

  mixins: [api],

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
      },
      users: [],
      alert: false,
      alertType: "",
      alertMeassage: "",
    };
  },

  async mounted() {
    const vm = this;
    await vm.getUsers();
  },

  methods: {
    submitForm() {
      const vm = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          vm.login();
        }
      });
    },

    login() {
      this.alert = false;

      let result = this.users.find((user) => {
        return user.email == this.form.email;
      });
      if (result) {
        localStorage.setItem(
          "user",
          encodeURIComponent(JSON.stringify(result))
        );
        this.$router.push({ name: "Home" });
      } else {
        this.alertType = "error";
        this.alert = true;
        this.alertMeassage = "Opps! You have inputed wrong email";
      }
    },

    async getUsers() {
      const vm = this;

      vm.axios
        .get(vm.api.GetAllUsers)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.users = [];
        });
    },

    clearData() {
      this.alert = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin.scss";
.danger {
  color: #ff5252;
}
.auth-row {
  align-items: center;

  @include responsive-max("md") {
    flex-direction: column-reverse;
  }
}

.auth-card {
  box-shadow: 0 0 16px rgba(203, 203, 203, 0.67) !important;
  padding: 1rem;
  min-height: 320px;

  @include responsive-max("sm") {
    padding: 0;
  }
}
</style>
