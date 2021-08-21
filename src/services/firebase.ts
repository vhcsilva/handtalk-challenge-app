import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: 'AIzaSyDqjx0uP7EoCSWIs7YdtYhOwPTnboha5EY',
  authDomain: 'handtalkchallenge.firebaseapp.com',
  projectId: 'handtalkchallenge',
  storageBucket: 'handtalkchallenge.appspot.com',
  messagingSenderId: '951179936444',
  appId: '1:951179936444:web:60d9ecb38523f88a8646b9'
}

const app = firebase.initializeApp(firebaseConfig)

export const fbFirestore = app.firestore()
export const fbStorage = app.storage()

