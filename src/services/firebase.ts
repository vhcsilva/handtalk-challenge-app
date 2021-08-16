import firebase from 'firebase'

export const firebaseConfig = {
  //TODO insira aqui suas credenciais firebase
}

const app = firebase.initializeApp(firebaseConfig)

export const fbFirestore = app.firestore()
export const fbStorage = app.storage()

