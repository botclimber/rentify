<template>
  <div>
    <h1>Login</h1>
    <div>
      <input type="text" v-model="email" placeholder="Enter Email" />
      <br />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <br />
      <button v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
    },
  },
};
</script>
<style></style>
