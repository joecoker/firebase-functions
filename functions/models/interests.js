'use strict'

class Interests {
  static calculateDonations(polInterests) {

    const byPartySupport = polInterests.find(interests => {
      return interests['$'].name === '(a) Support linked to an MP but received by a local party organisation or indirectly via a central party organisation'
    });

    const otherSupport = polInterests.find(interests => {
      return interests['$'].name === '(b) Any other support not included in Category 2(a)'
    });

    const donations = {
      byPartySupport: {
        totalAmount: this.sumAmount(),
        record: this.formatPartySupport(),
      }, 
      otherSupport: {
        totalAmount: this.sumAmount(),
        record: this.formatOtherSupport()
      },
      totalAmount: this.sumAmount()
    }

    return donations
  }
}

module.exports = Interests;