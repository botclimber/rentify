<script>
import SimpleModal from '../modals/simple_modal.vue'

export default {
    name: "All_Reviews",
    components:{ SimpleModal},
    props:{
        reviews: Object
    },

    data(){
        console.log(this.reviews)
        return {
            allData: this.reviews,
            showModal: false
        }
    },

    methods: {
        close(){this.showModal = false},
        callModal(){this.showModal = true}
    }
  }

</script>

<template>
    
<div class="row">

    <div class="col-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Reviews</h4>
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
                            <SimpleModal v-if="showModal" :title="'teste de teste'" @close="close"> 
                                <template #body>
                                Modal Body
                                </template>
                                <template #footer>
                                <button>Close</button>
                                </template>
                            </SimpleModal>
                            <td class="py-1">
                              <button @click="callModal()"><img src="../../assets/images/faces-clipart/pic-1.png" alt="image" /></button>
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