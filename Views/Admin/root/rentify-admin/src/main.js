import {createApp} from 'vue'
import App from './App.vue'

const apis = {
  reviewsApi: "http://localhost:8000/api/v1/",
  usersApi: "http://localhost:8001/user/"
}

const urlParams = new URLSearchParams(window.location.search)
const tk = urlParams.get("t")

async function authVerification (){

    const res = await fetch('http://localhost:8001/user/profile',{
      method: 'GET',
      headers: {'Content-type': 'application/json',
      'authorization':'baer '+tk,
      },

    }).catch(err => console.log(err))

    const data = await res.json()
    if( data.verified && !data.blocked){

      createApp(App)

      .provide('apis', apis)
      .provide('tk', tk)
      .provide('firstName', data.firstName)
      .provide('lastName', data.lastName)

      .mount('#app')

    }else window.location.href = "http://localhost:8081/"
}

authVerification()
