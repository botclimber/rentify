<template>
  <div class="container" style="margin-top: 60px; width: 30%">
    <form>
      <!-- Name input -->
      <div class="form-outline mb-4">
        <input
          type="text"
          id="form2Example1"
          class="form-control"
          v-model="name"
          placeholder="Name"
        />
      </div>

      <!-- Username input -->
      <div class="form-outline mb-4">
        <input
          type="text"
          id="form2Example1"
          class="form-control"
          v-model="username"
          placeholder="Username"
        />
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          class="form-control"
          v-model="email"
          placeholder="Email"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <div class="row mb-4">
        <!-- Submit button -->
        <button
          type="button"
          class="btn btn-primary btn-md btn-block"
          v-on:click="register"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthenticationService from "../services/AuthenticationService";

export default defineComponent({
  name: "Register-Form",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      AuthenticationService.register(
        this.email,
        this.password,
        this.name,
        this.username
      )
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
});
</script>
<style></style>
