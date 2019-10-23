'use strict'

class Interests {
  static calculateDonations(politician) {
    if(politician.category) {
      politician.category.forEach(interestSet => {
        // if(interestSet['$'].type === '2') {
          console.log(interestSet);
        // }
      })
    }
  }
}

module.exports = Interests;