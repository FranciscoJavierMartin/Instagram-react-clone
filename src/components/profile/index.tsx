import React, { useEffect, useReducer, useState } from 'react';
import { FirebaseUser } from '../../interfaces/firebase';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserId } from '../../services/firebase';
import { UserProfileState } from '../../interfaces/profile';

interface UserProfileProps {
  user: FirebaseUser;
}

function reducer(
  state: UserProfileState,
  newState: Partial<UserProfileState>
): UserProfileState {
  return {
    ...state,
    ...newState,
  };
}

const initialState: UserProfileState = {
  profile: null,
  photosCollection: [],
  followerCount: 0,
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isLoadingPhotos, setIsLoadingPhotos] = useState<boolean>(false);
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async function getProfileInfoAndPhotos() {
      setIsLoadingPhotos(true);
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
      setIsLoadingPhotos(false);
    })();
  }, [user]);

  return profile ? (
    <>
      <Header
        photosCount={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} isLoadingPhotos={isLoadingPhotos} />
    </>
  ) : null;
};

export default UserProfile;
