import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { LOCALSTORAGE_AUTH_USER_KEY } from '../constants/localStorage';
import useFirebaseContext from './context/useFirebaseContext';

export default function useAuthListener() {
  const userFromLocalStorage = localStorage.getItem(LOCALSTORAGE_AUTH_USER_KEY);
  const [user, setUser] = useState<firebase.User | null>(
    userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null
  );
  const { firebase } = useFirebaseContext();

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem(
          LOCALSTORAGE_AUTH_USER_KEY,
          JSON.stringify(authUser)
        );
        setUser(authUser);
      } else {
        localStorage.removeItem(LOCALSTORAGE_AUTH_USER_KEY);
        setUser(null);
      }
    });

    return () => {
      listener();
    };
  }, [firebase]);

  return { user };
}
