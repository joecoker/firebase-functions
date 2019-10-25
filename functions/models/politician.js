'use strict'
const mpDetailsJson = require('../politician-data/mp-details.json');
const photoIds = require('../politician-data/photoIds.json');

class Politician {
  constructor (name) {
    this.details = this.findPoliticianDetails(name),
    this.party = this.details.mpParty,
    this.constituency = this.details.mpConstituency, 
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
}

module.exports = Politician; 