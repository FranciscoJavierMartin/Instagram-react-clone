import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../components/Header';
import UserProfile from '../components/profile';
import { NOT_FOUND_PAGE_ROUTE } from '../constants/routes';
import { FirebaseUser } from '../interfaces/firebase';
import { getUserByUsername } from '../services/firebase';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<FirebaseUser>();
  const history = useHistory();

  useEffect(() => {
    (async function checkUserExists() {
      const userFromFirebase = await getUserByUsername(username);
      setUser(userFromFirebase);
      if (!userFromFirebase) {
        history.push(NOT_FOUND_PAGE_ROUTE);
      }
    })();
  }, [username, history]);

  return user ? (
    <div className='bg-gray-background'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
