<template>
  <div id="app">
    <v-app>
      <main>
        <nav class="navbar navbar-light bg-light justify-content-center">
          <a :href="commonLogin" class="navbar-brand">Rentify</a>
        </nav>
        <nav class="navbar justify-content-center">
        <a :href="commonLogin" style="padding:15px" >Normal Login</a>
        <a :href="adminLogin" style="padding:15px" >Admin Login</a>
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
            <a class="text-white" :href="commonLogin">Rentify.com</a>
          </div>
        </footer>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  setup() {
    return {
      commonLogin: '/user/login',
      adminLogin: '/user/loginAdmin'
    };
  },
};
</script>
