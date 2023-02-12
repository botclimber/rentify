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
      <Form @submit="register">
        <!-- Name input -->
        <div class="form-outline mb-4">
          <Field
            name="firstName"
            type="text"
            class="form-control"
            id="form2Example1"
            v-model="firstName"
            placeholder="First Name"
          />
        </div>

        <!-- Name input -->
        <div class="form-outline mb-4">
          <Field
            name="lastName"
            type="text"
            id="form2Example1"
            class="form-control"
            v-model="lastName"
            placeholder="Last Name"
            required
          />
        </div>

        <!-- Username input -->
        <div class="form-outline mb-4">
          <Field
            name="username"
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
          <Field
            name="email"
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
          <Field
            name="password"
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
            title="Register"
            class="btn btn-primary btn-md btn-block"
            type="submit"
          >
            Register
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserService from "../services/UserService";
import { Form, Field } from "vee-validate";

export default defineComponent({
  name: "Register-Form",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      loginForm: "loginform",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      isRegistered: false,
    };
  },
  methods: {
    async register() {
      const validInputs = await this.validateInputs();
      if (!validInputs) return;
      UserService.register(
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password
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
    async validateInputs() {
      const { firstName, lastName, username, email, password } = this;
      console.log(firstName, lastName, username, email, password);

      return (
        firstName != "" &&
        lastName != "" &&
        username != "" &&
        email != "" &&
        password != ""
      );
    },
  },
});
</script>
<style></style>
