<template>
  <div class="container" style="margin-top: 60px; width: 30%">
    <div v-if="isRegistered">
      User registered successfully. Check your email to verify your account

      <div class="row mb-4">
        <!-- Submit button -->
        <button
          type="button"
          class="btn btn-primary btn-md btn-block"
          v-on:click="goToLogin"
        >
          Redirect to login page
        </button>
      </div>
    </div>
    <div v-else>
      <form>
        <!-- Name input -->
        <div class="form-outline mb-4">
          <input
            type="text"
            id="form2Example1"
            class="form-control"
            v-model="name"
            placeholder="Name"
            required
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
            required
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
            required
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
            required
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
      isRegistered: false,
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
        .then((response) => {
          console.log(response.data);
          this.isRegistered = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goToLogin() {
      this.$router.push({ name: "Login-Form" });
    },
  },
});
</script>
<style></style>
