const firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyBR6q0WIss2eatXaYwhcYhNKFT4pYZYJzY",
  authDomain: "where-is-the-money-from.firebaseapp.com",
  projectId: "where-is-the-money-from"
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


