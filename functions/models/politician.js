'use strict'
const mpDetailsJson = require('../politician-data/mp-details.json');
const photoIds = require('../politician-data/photoIds.json');

class Politician {
  constructor (name) {
    this.details = this.findPoliticianDetails(name),
    this.photoId = this.findPhotoId(name)
  }

  findPoliticianDetails(name) {
    return mpDetailsJson.find(politician => {
      return politician.mpFullName === name;
    });
  }

  findPhotoId(name) {
    const politician = photoIds.find(politicianObj => {
      return politicianObj.name === name;
    });
    return politician ? politician.id : undefined;
  }

  get party() {
    return this.details ? this.details.mpParty : undefined
  }

  get constituency() {
    return this.details ? this.details.mpConstituency : undefined
  }
}

module.exports = Politician; 