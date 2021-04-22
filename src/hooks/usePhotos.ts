import { useEffect, useState } from 'react';
import { PhotoWithUserDetails } from '../interfaces/firebase';
import { getUserByUserId, getPhotos } from '../services/firebase';
import useUserContext from './context/useUserContext';

export default function usePhotos() {
  const [photos, setPhotos] = useState<PhotoWithUserDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      (async function getTimelinePhotos() {
        setIsLoading(true);
        const { following } = await await getUserByUserId(user.uid);
        let followedUserPhotos: PhotoWithUserDetails[] = [];

        if (following.length > 0) {
          followedUserPhotos = await getPhotos(user.uid, following);
        }

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
        setIsLoading(false);
      })();
    }
  }, [user]);

  return { photos, isLoading };
}
