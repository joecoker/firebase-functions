// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const firebase = require('firebase');
const XmlStream = require('xml-stream');
const parseString = require('xml2js').parseString;
const request = require('request');
const concat = require('concat-stream');
const Politician = require('./models/politician');
const Interests = require('./models/interests')
require('dotenv').config()

// firebase.initializeApp({
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: `where-is-the-money-from`
// })

// const db = firebase.firestore();

// exports.updateDatabase = functions.pubsub.schedule('every 2 minutes').onRun(() => {
//   runUpdate()
// })


const runUpdate = async () => {
  // 1 get date
  const todaysDate = formatDate();
  // 2 download register of interests XML
  const donations = convertXMLsToDonationsJson(todaysDate);
  // 3 convert donations to json
  // const donations = await createDonationsObject(registeredInterestsXml);
  
  // 4 Check for nulls / wrong dates etc - throw errors 

  // update database
  // addToCollection()
}

const formatDate = () => {
  const date = new Date();
  const month = date.getMonth().length < 2 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const todaysDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
  return todaysDate;
}

const convertXMLsToDonationsJson = async (date) => {
  let politicians = []
  try {
    let xmlResponse = request('https://www.theyworkforyou.com/pwdata/scrapedxml/regmem/regmem2019-09-30.xml'); // or stream directly from your online source
    
    xmlResponse.pipe(concat((buffer) => {
      let string = buffer.toString();
      
      parseString(string, { trim: true }, (err, result) => {
        try {
          // Boris Johnson
          // formatPoliticianObject(result.publicwhip.regmem[316]);


          result.publicwhip.regmem.forEach(politician => {
            const politicianJson = formatPoliticianObject(politician)
            politicians.push(politicianJson)
          });

        } catch (error) {
          console.log(err);
        }
      });
    }))
  } catch (error) {
    console.log(error)
  }
}

const formatPoliticianObject = (politician) => {
  try {
      const politicianDetails = new Politician(politician['$'].membername);
      console.log(politician['$'].membername)
      let formatPoliticianObj = {
        name: politician['$'].membername,
        party: politicianDetails.party,
        constituency: politicianDetails.constituency,
        yearElected: 2017,
        photoID: politicianDetails.photoId,
        interests: {
          donationsAndSupport: Interests.calculateDonations(politician.category)
          }
      }
  
} catch (error) {
  console.log(error);
}
}

const addToCollection = async (donations) => {
  donations.forEach((obj) => {
    try {
      const documentReference = db.collection('donations').add({
        id: obj.id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        type: obj.type
      })
      console.log("Document written with ID: ", docRef.id)
    } catch(error) {
      console.log("Error adding documents", error)
    }
  })
}

runUpdate()