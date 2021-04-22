import {
  FIREBASE_COLLECTION_PHOTOS,
  FIREBASE_COLLECTION_USERS,
} from '../constants/collections';
import {
  FirebasePhoto,
  FirebaseUser,
  PhotoWithUserDetails,
} from '../interfaces/firebase';
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

export async function getSuggestedProfiles(
  userId: string,
  following: string[]
): Promise<FirebaseUser[]> {
  const usersToDiscard = following.concat(userId);
  const result = await firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .where('userId', 'not-in', usersToDiscard)
    .limit(10)
    .get();

  return result.docs.map<FirebaseUser>(
    (user) => ({ ...user.data(), docId: user.id } as FirebaseUser)
  );
}

/**
 * @param {string}  loggedInUserDocId - Currently logged in user document id.
 * @param {string} profileId - User that logged User want to follow
 * @param {boolean} isFollowingProfile - Am I currently following this user?
 * @return {void}
 */
export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
): Promise<void> {
  return firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

/**
 * @param {string}  profileDocId - Currently logged in user document id.
 * @param {string} loggedInUserDocId - User that logged User want to follow
 * @param {boolean} isFollowingProfile - Am I currently following this user?
 * @return {void}
 */
export async function updateFollowedUserFollowers(
  profileDocId: string,
  loggedInUserDocId: string,
  isFollowingProfile: boolean
): Promise<void> {
  firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_USERS)
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function getPhotos(
  userId: string,
  following: string[]
): Promise<PhotoWithUserDetails[]> {
  const result = await firebase
    .firestore()
    .collection(FIREBASE_COLLECTION_PHOTOS)
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map<FirebasePhoto>(
    (photo) =>
      ({
        ...photo.data(),
        docId: photo.id,
      } as FirebasePhoto)
  );

  const photosWithUserDetails = await Promise.all<PhotoWithUserDetails>(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}
