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
              Register
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
              <v-text-field
                v-model="form.firstName"
                label="First Name"
                placeholder="Enter your first name"
                outlined
                type="text"
                dense
                hide-details
                class="mb-4"
                v-validate="'required'"
                name="firstName"
                data-vv-as="first name"
              ></v-text-field>

              <p
                v-show="errors.has('firstName')"
                class="font-weight-regular danger"
              >
                {{ errors.first("firstName") }}
              </p>

              <v-text-field
                v-model="form.lastName"
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                outlined
                dense
                hide-details
                class="mb-6"
                v-validate="'required'"
                name="lastName"
                data-vv-as="last name"
              ></v-text-field>
              <p
                v-show="errors.has('lastName')"
                class="font-weight-regular danger"
              >
                {{ errors.first("lastName") }}
              </p>
            </div>
            <div>
              <v-btn
                @click="submitForm()"
                class="mb-2"
                depressed
                color="primary"
                >Sign Up</v-btn
              >

              <p class="font-weight-medium">
                Already a member?
                <router-link to="/login">Login Here</router-link>
              </p>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img src="@/assets/images/signup.svg"></v-img>
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

  methods: {
    submitForm() {
      const vm = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          vm.register();
        }
      });
    },

    register() {
      const vm = this;
      vm.axios
        .post("CreateUser", this.form)
        .then(() => {
          vm.alertType = "success";
          vm.alert = true;
          vm.alertMeassage = "User created successfully";
          setTimeout(() => {
            vm.$router.push({ name: "Login" });
          }, 500);
        })
        .catch((error) => {
          console.log(error);
          vm.alertType = "error";
          vm.alert = true;
          vm.alertMeassage = "Opps! Something went wrong";
        });
    },

    getUsers() {
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
