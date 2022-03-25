<template>
    <div class="chat__body-message">
        <div v-if="message" :class="message.messageType == 1 ? 'message-right' : 'message-left'" class="text-center">
            <p class="chat__body-message-chat" :class="message.messageType == 1 ? 'sender' : 'reciever'">{{message.message}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
      message: Object,
      userId: Number
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin.scss";
.chat__body-message {
    .message-left {
        margin-left: auto;
        margin-right: 15px;
    }
    .message-right {
        margin-right: auto;
        margin-left: 15px;
    }
}
.chat {
  &__body {
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

    &-message {
    flex-grow: 1;
    background-color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 1rem;

    &-chat {
        padding: 5px 8px;
        background-color: #00897b;
        display: inline-flex;
        border-radius: 8px;
        color: var(--color-white);
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        font-weight: 400;
        position: relative;

        &::before {
        content: "";
        width: 10px;
        height: 10px;
        background-color: #00897b;
        position: absolute;
        right: -4px;
        top: 7px;
        transform: rotate(45deg);
        }

        &.reciever {
        margin-right: auto;
        background: var(--color-primary);

        &::before {
            left: -4px;
            right: auto;
            top: 7px;

            background: var(--color-primary);
        }
        }
    }
    }

    &-input {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;
    }

    &-btn {
    height: 100% !important;
    background-color: var(--color-primary) !important;
    color: var(--color-white);
    }
    }
}

</style>
