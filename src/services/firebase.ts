import { FIREBASE_COLLECTION_USERS } from '../constants/collections';
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExists(username: string): Promise<boolean> {
  const result = await firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
}
