module.exports = class Locations {

  constructor(lat, lng, residence, reviews){
    this.lat = lat
    this.lng = lng
    this.residence = residence
    this.reviews = reviews // array of reviews
  }

  transform(){
    console.log(this.reviews)

    // enchance this in order to return all needed data
    //this.reviews = 
    this.reviews = "<ul class='list-group list-group-flush'>"+this.reviews.map( comment => 
      "<li class='list-group-item'>"
      +"<div class='row'>"
      +"<div class='col-md-12'>"
      +(this.getResidenceForRev(comment.residenceId) || '')
      +"</div>"
      +"<div class='col-md-12'>"
      +"<p class='float-left'>Daniel Silva</p>"
      +this.getStars(comment.rating)
      +"</div>"
      +"</div>"
      +comment.review
      +"</li>"
    ).join("")+"</ul>"
  }

  getStars(rating){
    var starBuild = "<div class='wrapper float-right'>"
    
    var countdown = rating
    do{
      starBuild += "<label style='color:#ffbd00;font-size:8pt' for='st"+countdown+"'></label>"
      countdown -= 1
    }while(countdown > 0)
      
    starBuild += "</div>"

      return starBuild
  }

  getResidenceForRev(resId){

    for (let data of this.residence){
      console.log(data, resId, data.id, data.floor)
      if(data.id == resId && (data.floor != '' || data.direction != '')){
        return "<p>"+data.floor+" | "+data.direction+"</p>"
      }
    }
  }

  //getUserForRev(userId){}
}
