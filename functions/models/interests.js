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
        // record: this.formatPartySupport(),
        totalAmount: 'this.sumAmount()'
      }, 
      otherSupport: {
        record: this.formatOtherSupport(otherSupport.record[0].item),
        totalAmount: 'this.sumAmount()'
      },
      totalAmount: 'this.sumAmount()'
    }
    return donations
  }

  static formatOtherSupport(record) {
    let donationsRecord = [];
    record.forEach(donation => {
      if ('span' in donation) {
        donationsRecord.push(this.createOtherDonorObject(donation.span[0]))
      } else if ('strong' in donation) {
        donationsRecord.push(this.createOtherDonorObject(donation.strong[0].em[0]))
      } else {
        donationsRecord.push(this.createOtherDonorObject(donation))
      }
    })
  }

  static createOtherDonorObject(donation) {
    const donorObject = {
      donorName: donation['_'].replace('Name of donor: ', ''),
      address: donation.br[0].replace('Address of donor: ', ''),
      amountPence: this.getAmountPence(donation.br[1]),
      dateRecieved: donation.br[2].replace('Date received: ', ''),
      dateAccepted: donation.br[3].replace('Date accepted: ', ''),
      status: donation.br[4].replace('Donor status: ', '')
    }
    // console.log(donorObject)
    // return donorObject
  }

  static getAmountPence(amountString) {
    const noCommas = amountString.replace(/,/g, '')
    const amount = noCommas.match(/[0-9]+/g);
    console.log(amount)
    if (amount === null) {
      return null;
    } else {
      return;
    }
  }
}

module.exports = Interests;