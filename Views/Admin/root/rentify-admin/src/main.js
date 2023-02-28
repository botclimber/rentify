import { createApp } from 'vue'
import App from './App.vue'

/*
send token verification request to server
to make sure that token is valid and no one input it manually

dont go further without this validation

token in this case MUST have expiration time
*/
const urlParams = new URLSearchParams(window.location.search)
const tk = urlParams.get("t")
console.log(tk)

if(!tk) window.location.href = "http://localhost:8081/"

createApp(App)
.mount('#app')
