const Db = require("./Db.js")

class Review {
  constructor(address, comment, anon, rating){
      this.address = address
      this.comment = [comment]
      this.anon = anon
      this.rating = rating
  }

  addComment(comment){this.comment.push(comment)}
}

class Reviews extends Db.module{
  constructor(){

    // later when getting data from db replace this structure from array to Map
    super()
    this.reviews = []

  }

  test(){ console.log(this.con) }

  exists(review){

    for (let rev of this.reviews){
      if(review.address.coords.lat == rev.address.coords.lat && review.address.coords.lng == rev.address.coords.lng) return true
    }

    return false
  }

  addReview(review){
    if(review.address.city !== "" && review.address.street !== "" && review.address.nr !== ""){
    if(this.exists(review)){
      for (let rev of this.reviews){
        if(review.address.coords.lat == rev.address.coords.lat && review.address.coords.lng == rev.address.coords.lng){
          rev.addComment(review.comment[0])
        }
      }
    }else{
      this.reviews.push(review)
    }
  }
  }

/*
for test pursposes we have this data object inside getAll method but,
idea is to change for db request data
*/
  getAll(){
    var data = {
        reviews: this.reviews,
        buildComments: function(comments){ // dummy function
          var con = '<ul>'
          for (let x of comments){
            con += '<li>'+x+'</li>'
          }
          con += '</ul>'

          return con
        },
        locations: function(){
          var content = '{'

            var id = 1
          	for(let x of this.reviews){
          		content += '"m'+id+'": {"lat":'+x.address.coords.lat+',"lng": '+x.address.coords.lng+', "reviews":"'+this.buildComments(x.comment)+'"}'
          		content += (id == this.reviews.length)? '' : ','
              id++
            }

          	content += '}'

            return content
        }
    }

    console.log(data.locations())
    return data
  }

  //getOne()
}


module.exports = {
  Review: Review,
  Reviews: Reviews
}
