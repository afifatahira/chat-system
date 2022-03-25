<template>
  <div class="auth">
    <div class="auth__container">
      <register-user></register-user>
    </div>
  </div>
</template>

<script>
import RegisterUser from "../components/RegisterUser.vue";
export default {
  components: { RegisterUser },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin.scss";
.auth {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 700px;
    @include responsive-max("md") {
      width: 90%;
      height: 80vh;
    }
  }
}
</style>
