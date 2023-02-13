<script>

export default {
    name: "All_Reviews",
    props:{
        reviews: Object
    },

    data(){
        console.log(this.reviews)
        return {
            allData: this.reviews
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
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> User </th>
                            <th> Review </th>
                            <th> Address </th>
                            <th> CreatedAt </th>
                            <th>  </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="row of allData" :key="row.rev.id">
                            <td class="py-1">
                              <a href="#"><img src="../../assets/images/faces-clipart/pic-1.png" alt="image" /></a>
                            </td>
                            <td> {{ row.rev.review }} </td>
                            <td>
                              {{ row.addr.city }}, {{ row.addr.street }} nr. {{ row.addr.nr }}
                            </td>
                            <td> {{ row.rev.createdOn }}</td>
                            <td> </td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
            </div>
        </div>

</template>