<template>
  <div class="container" style="margin-top: 60px; width: 30%">
    <div v-if="isLogged">Login successful for user with email {{ email }}</div>
    <div v-else>
      <form>
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
            v-on:click="changePassword"
          >
            Change Password
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
  name: "ChangePassword-Form",
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async changePassword() {
      await AuthenticationService.updatePassword(
        +this.$route.params.id,
        this.password,
        this.$route.params.passwordToken as string
      )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>
<style></style>
