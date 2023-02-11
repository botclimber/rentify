<template>
  <div class="container" style="margin-top: 60px; width: 30%">
    <div v-if="isLogged">Login successful for user with email {{ email }}</div>
    <div v-else>
      <form>
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

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex">
            <!-- Checkbox -->
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                checked
              />
              <label class="form-check-label" for="form2Example31">
                Remember me
              </label>
            </div>
          </div>

          <div class="col">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <div class="row mb-4">
          <!-- Submit button -->
          <button
            type="button"
            class="btn btn-primary btn-md btn-block"
            v-on:click="login"
          >
            Sign in
          </button>
        </div>

        <!-- Register buttons -->
        <div class="text-center">
          <p>Not a member? <a href="" @click="register">Register</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthenticationService from "../services/AuthenticationService";

export default defineComponent({
  name: "Login-Form",
  data() {
    return {
      email: "",
      password: "",
      isLogged: false,
    };
  },
  methods: {
    async login() {
      await AuthenticationService.login(this.email, this.password)
        .then((response) => {
          console.log(response.data);
          this.isLogged = true;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.isLogged);
      console.log(this.email, this.password);
    },
    register() {
      this.$router.push({ name: "Register-Form" });
    },
  },
});
</script>
<style></style>
