<template>
  <div class="container">
    <div>Success</div>
    <p>{{ email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Success-test",
  data() {
    return {
      email: "",
    };
  },
});
</script>
<style></style>
