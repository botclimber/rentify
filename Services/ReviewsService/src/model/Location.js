const date = require('date-and-time')

module.exports = class Locations {

  constructor(lat, lng, residence, reviews){
    this.lat = lat
    this.lng = lng
    this.residence = residence
    this.reviews = reviews // array of reviews
  }

  async transform(){

    this.reviews = "<ul class='list-group list-group-flush'>"+this.reviews.map(  comment => {
      const rev = (comment.review.length > 20)? "<p>"+comment.review.substring(0,20) +"<span id=\"dots"+comment.id+"\">...</span><span style=\"display:none\" id=\"more"+comment.id+"\">"+comment.review.substring(20, comment.review.length)+"</span></p><a href=\"#\" onclick=\"readMore("+comment.id+")\" id=\"readMore"+comment.id+"\">Read more</a>" :  "<p>"+comment.review +"</p>"   

      return "<li class='list-group-item'>"
      +"<div class='row'>"
      +"<div class='col-md-12'>"
      +(this.getResidenceForRev(comment.residenceId) || '')
      +"</div>"
      +"<div class='col-md-12'>"
      +"<p class='float-left'>"+comment.userName+"</p>"
      +this.getStars(comment.rating)
      +"</div>"
      +"</div>"
      +"<div class='row'>"
      +"<div class='col-md-12'>"
      + rev
      +"</div>"
      +"<div class='col-md-12'>"
      +"<p class='float-right' style='font-size:9pt'>"+date.format(comment.createdOn, "DD/MM/YYYY - HH:mm")+"</p>"
      +"</div>"
      +"</div>"
      +"</li>"
    }
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
}
