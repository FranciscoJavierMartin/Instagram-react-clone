import { useEffect, useState } from 'react';
import { FirebaseUser } from '../interfaces/firebase';
import { getUserByUserId } from '../services/firebase';
import useUserContext from './context/useUserContext';

export default function useUser(): { user?: FirebaseUser } {
  const [activeUser, setActiveUser] = useState<FirebaseUser>();
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.uid) {
      (async function getUserObjByUserId() {
        const response = await getUserByUserId(user.uid);
        setActiveUser(response);
      })();
    }
  }, [user]);

  return { user: activeUser };
}
