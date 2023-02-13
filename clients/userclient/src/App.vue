<template>
  <div id="app">
    <v-app>
      <main>
        <nav class="navbar navbar-light bg-light justify-content-center">
          <a class="navbar-brand">Rentify</a>
        </nav>
        <router-view />
        <footer
          class="fixed-bottom text-center text-lg-start"
          style="background-color: #f0f0f0"
        >
          <div
            class="text-center text-white p-3"
            style="background-color: rgba(0, 0, 0, 0.2)"
          >
            © 2023 Copyright:
            <a class="text-white" href="">Rentify.com</a>
          </div>
        </footer>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>
