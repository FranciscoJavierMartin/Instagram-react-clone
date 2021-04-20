import Firebase from 'firebase/app';

export interface FirebaseContextState {
  firebase: Firebase.app.App;
  FieldValue: typeof Firebase.firestore.FieldValue;
}
