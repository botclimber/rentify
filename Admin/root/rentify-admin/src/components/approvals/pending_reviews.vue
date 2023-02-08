<script>

const reviewsApi = "http://localhost:8000/api/adm/"

export default{
  name:"Pending_Reviews",

  data(){
    return {
      allData: []
    }
  },

  //watch:{},
  created(){
      this.getPendingReviews()
  },
  
  methods:{
    async getPendingReviews(){
      const res = await fetch(reviewsApi+'getPendReviews').catch(err => console.log(err))
      const data = await res.json()
      
      this.allData = data.reviews

    },
    async updateReview(revId, dec){
      if(confirm("Are you sure ?")){
        const res = await fetch(reviewsApi+'updateReview/'+revId,{
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({decision: dec})
        })
        const data = await res.json()

        this.allData = data.reviews
      }
    }
  },
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
      @click="updateReview(row.rev.id, 1)"
                      class="badge badge-outline-success asBtn"
                    >
                      Approve
                    </div>
                    <div
                      class="badge badge-outline-danger asBtn"
      @click="updateReview(row.rev.id, 2)"
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
