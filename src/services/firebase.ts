import { FIREBASE_COLLECTION_USERS } from '../constants/collections';
import { FirebaseUser } from '../interfaces/firebase';
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username: string): Promise<boolean> {
  const result = await firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUserId(userId: string): Promise<FirebaseUser> {
  const result = await firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .where('userId', '==', userId)
    .get();

  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user as FirebaseUser;
}
