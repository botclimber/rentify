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
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:7000/user/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      console.log(this.email, this.password);
    },
  },
});
</script>
<style></style>
