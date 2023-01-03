// thinking about best approach

class Review {
  constructor(address, comment, anon, rating){
      this.address = address
      this.comment = [comment]
      this.anon = anon
      this.rating = rating
  }

  addComment(comment){this.comment.push(comment)}
}

class Reviews{
  constructor(){

    // later when getting data from db replace this structure from array to Map
    this.reviews = []
  }

  exists(review){

    for (let rev of this.reviews){
      if(review.address.coords.lat == rev.address.coords.lat && review.address.coords.lng == rev.address.coords.lng) return true
    }

    return false
  }

  addReview(review){
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

          	for(let x of this.reviews){
          		content += '"m'+x.address.nr+'": {"lat":'+x.address.coords.lat+',"lng": '+x.address.coords.lng+', "reviews":"'+this.buildComments(x.comment)+'"}'
          		content += (x.address.nr == this.reviews[this.reviews.length - 1].address.nr)? '' : ','
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
