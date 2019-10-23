const firebase = require('firebase');

firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: ''
})

const db = firebase.firestore();



menu.forEach((obj) => {
  db.collection("menu").add({
    id: obj.id,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    type: obj.type
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });
});


