import { FirebasePhoto, FirebaseUser } from './firebase';

export interface UserProfileState {
  profile: FirebaseUser | null;
  photosCollection: FirebasePhoto[];
  followerCount: number;
}
