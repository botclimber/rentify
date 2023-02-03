<script>
export default{
  name:"Home",

  props:{
    socket: Object
  },

  data(){
    return {
      allData: []
    }
  },

  //watch:{},
  /* Working dope!
  methods:{
    testingOnMsg(){
      this.socket.send(JSON.stringify({type:"search",city:'Braga',street: "", buildingNumber: "", floor: "", side: ""}))
    }
  },*/

  created(){
    this.socket.onopen = (e) => {
      console.log("[open] Connection established");
      console.log("Sending to server");
      // this.msg = "Testing" // works ! :)
      
      this.socket.send(JSON.stringify({type: 'pendingReviews'}))
    },

    this.socket.onmessage =  (event) => {
      //console.log(`[message] Data received from server: ${event.data}`);
      //document.getElementById("resp").innerHTML += event.data+"<br>"
      //this.msg = event.data // works ! :)
      const data = JSON.parse(event.data)
      
      //console.log(data.reviews)
      for(let x of data.reviews){ console.log(x.rev.review)}
      this.allData = data.reviews
      
    },

    this.socket.onerror = (error) => {
      console.log(`[error]`);
    }
  }
  
}
</script>


<template>
      <div class="content-wrapper">
        <div class="row">
          <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-9">
                    <div class="d-flex align-items-center align-self-start">
                      <h3 class="mb-0">$12.34</h3>
                      <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="icon icon-box-success ">
                      <span class="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 class="text-muted font-weight-normal">Potential growth</h6>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-9">
                    <div class="d-flex align-items-center align-self-start">
                      <h3 class="mb-0">$17.34</h3>
                      <p class="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="icon icon-box-success">
                      <span class="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 class="text-muted font-weight-normal">Revenue current</h6>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-9">
                    <div class="d-flex align-items-center align-self-start">
                      <h3 class="mb-0">$12.34</h3>
                      <p class="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="icon icon-box-danger">
                      <span class="mdi mdi-arrow-bottom-left icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 class="text-muted font-weight-normal">Daily Income</h6>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-9">
                    <div class="d-flex align-items-center align-self-start">
                      <h3 class="mb-0">$31.53</h3>
                      <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="icon icon-box-success ">
                      <span class="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 class="text-muted font-weight-normal">Expense current</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 grid-margin">
            <div class="card">
              <div class="card-body">
                <h5>Revenue</h5>
                <div class="row">
                  <div class="col-8 col-sm-12 col-xl-8 my-auto">
                    <div class="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 class="mb-0">$32123</h2>
                      <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                    </div>
                    <h6 class="text-muted font-weight-normal">11.38% Since last month</h6>
                  </div>
                  <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4 grid-margin">
            <div class="card">
              <div class="card-body">
                <h5>Sales</h5>
                <div class="row">
                  <div class="col-8 col-sm-12 col-xl-8 my-auto">
                    <div class="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 class="mb-0">$45850</h2>
                      <p class="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                    </div>
                    <h6 class="text-muted font-weight-normal"> 9.61% Since last month</h6>
                  </div>
                  <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4 grid-margin">
            <div class="card">
              <div class="card-body">
                <h5>Purchase</h5>
                <div class="row">
                  <div class="col-8 col-sm-12 col-xl-8 my-auto">
                    <div class="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 class="mb-0">$2039</h2>
                      <p class="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                    </div>
                    <h6 class="text-muted font-weight-normal">2.27% Since last month</h6>
                  </div>
                  <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col-8 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Reviews waiting for approval</h4>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th> User </th>
                        <th> Review</th>
                        <th> Location </th>
                        <th> Creation Date </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row of allData" :key="row.rev.id">
                        <td>{{row.rev.userId}}</td>
                        <td>
                          <p>{{row.rev.review}}</p>
                        </td>
                        <td> <p>{{row.addr.lat}}, {{row.addr.lng}}</p> </td>
                        <td> <p>{{row.rev.createdOn}}</p> </td>
                        <td>
                          <button style="margin:5px" class="badge badge-outline-success">Approve</button>
                          <button style="margin:5px" class="badge badge-outline-danger">Reject</button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xl-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">To do list</h4>
                <div class="add-items d-flex">
                  <input type="text" class="form-control todo-list-input" placeholder="enter task..">
                  <button class="add btn btn-primary todo-list-add-btn">Add</button>
                </div>
                <div class="list-wrapper">
                  <ul class="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                    <li>
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox"> Create invoice </label>
                      </div>
                      <i class="remove mdi mdi-close-box"></i>
                    </li>
                    <li>
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox"> Meeting with Alita </label>
                      </div>
                      <i class="remove mdi mdi-close-box"></i>
                    </li>
                    <li class="completed">
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox" checked> Prepare for presentation </label>
                      </div>
                      <i class="remove mdi mdi-close-box"></i>
                    </li>
                    <li>
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox"> Plan weekend outing </label>
                      </div>
                      <i class="remove mdi mdi-close-box"></i>
                    </li>
                    <li>
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox"> Pick up kids from school </label>
                      </div>
                      <i class="remove mdi mdi-close-box"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
</template>
