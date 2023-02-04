<script>

export default{
  name:"Pending_Reviews",

  props:{
    socket: Object
  },

  data(){
    this.sendMessage({type: 'pendingReviews'})

    return {
      allData: []
    }
  },

  //watch:{},

  methods:{
	sendMessage(msg){this.socket.send(JSON.stringify(msg))},
	decision(res, revId, lat, lng){
		if(confirm('Are you sure about your decision?')){
			this.sendMessage({type:'updateReview', revId: revId, decision: res, lat: lat, lng: lng})
		}
	}
  },

  created(){
    this.socket.onopen = (e) => {
        console.log("[open] Connection established");
        console.log("Sending to server");

    },

    this.socket.onmessage =  (event) => {
      console.log(`[message] Data received from server: ${event.data}`);
      const data = JSON.parse(event.data)

      this.allData = data.reviews
    },

    this.socket.onerror = (error) => {
      console.log(`[error]`);
    }
  }

}
</script>

<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Reviews waiting for approval</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Review</th>
                  <th>Location</th>
                  <th>Creation Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row of allData" :key="row.rev.id">
                  <td>{{ row.rev.userId }}</td>
                  <td>
                    <p>{{ row.rev.review }}</p>
                  </td>
                  <td>
                    <iframe style="border-radius:10px"
                      width="300"
                      height="250"
                      loading="lazy"
                      allowfullscreen
                      referrerpolicy="no-referrer-when-downgrade"
                      :src="
                        'https://www.google.com/maps/embed/v1/place?key=AIzaSyBq2YyQh70n_M6glKgr3U4a9vCmY5LU0xQ&q=' +
                        row.addr.lat +
                        ',' +
                        row.addr.lng +
                        '&zoom=19'
                      "
                    >
                    </iframe>
                  </td>
                  <td>
                    <p>{{ row.rev.createdOn }}</p>
                  </td>
                  <td>
                    <div
			@click="decision(1, row.rev.id, row.addr.lat, row.addr.lng)"
                      class="badge badge-outline-success asBtn"
                    >
                      Approve
                    </div>
                    <div
                      class="badge badge-outline-danger asBtn"
			@click="decision(2, row.rev.id, row.addr.lat, row.addr.lng)"
                    >
                      Reject
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.asBtn{
  margin: 5px;
  cursor:pointer
}
</style>
