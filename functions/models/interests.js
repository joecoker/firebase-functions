'use strict'

class Interests {
  static calculateDonations(polInterests) {
    let donations = {
      byPartySupport: {
        record: [],
        totalAmount: 0,
      },
      otherSupport: {
        record: [],
        totalAmount: 0,
      },
      totalAmount: 0
    }
    
    if (polInterests) {
      const byPartySupport = polInterests.find(interests => {
        return interests['$'].name === '(a) Support linked to an MP but received by a local party organisation or indirectly via a central party organisation'
      });

      if (byPartySupport) {
        donations.byPartySupport = {
          record: this.formatPartySupport(byPartySupport.record[0].item),
          totalAmount: 0
        }
        donations.byPartySupport.totalAmount = this.sumAmount(donations.byPartySupport.record)
      }

      const otherSupport = polInterests.find(interests => {
        return interests['$'].name === '(b) Any other support not included in Category 2(a)'
      });

      if (otherSupport) {
        donations.otherSupport = {
          record: this.formatOtherSupport(otherSupport.record[0].item),
          totalAmount: 0,
        }
        donations.otherSupport.totalAmount = this.sumAmount(donations.otherSupport.record)
      }
    }
    donations.totalAmount = donations.byPartySupport.totalAmount + donations.otherSupport.totalAmount;

    return donations
  }

  static sumAmount(record) {
    return record.reduce((accumulator, donation) => {
      return accumulator += donation.amountPence
    }, 0);
  }

  static formatPartySupport(record) {
    let donationsRecord = [];
    record.forEach(donation => {
      if ('span' in donation) {
        donationsRecord.push(this.createPartyDonorObject(donation.span[0]));
      } else {
        donationsRecord.push(this.createPartyDonorObject(donation));
      }
    });
    return donationsRecord;
  }

  static createPartyDonorObject(donation) {
    return {
      donorName: donation['_'].replace('Name of donor: ', ''),
      address: donation.br[0].replace('Address of donor: ', ''),
      amountPence: this.getAmountPence(donation.br[1]),
      status: donation.br[2].replace('Donor status: ', ''),
      dateRegistered: donation.br[3].replace('(Registered ', '').replace(')', '')
    } 
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
    return donationsRecord;
  }

  static createOtherDonorObject(donation) {
    return {
      donorName: donation['_'].replace('Name of donor: ', ''),
      address: donation.br[0].replace('Address of donor: ', ''),
      amountPence: this.getAmountPence(donation.br[1]),
      dateRecieved: donation.br[2].replace('Date received: ', ''),
      dateAccepted: donation.br[3].replace('Date accepted: ', ''),
      status: donation.br[4].replace('Donor status: ', '')
    }
  }

  static getAmountPence(amountString) {
    console.log(amountString)
    const addPoundSign = amountString.replace(/[\uFFFD]/g, '£');
    const noCommas = addPoundSign.replace(/,/g, '');
    const amountPounds = noCommas.match(/£[0-9]+/g);
    const amountPence = parseInt(amountPounds[amountPounds.length - 1].replace('£','')) * 100;
    if (amountPence === null) {
      return null;
    } else {
      return amountPence;
    }
  }
}

module.exports = Interests;