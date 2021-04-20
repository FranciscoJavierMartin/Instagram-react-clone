import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FIREBASE_COLLECTION_USERS } from '../constants/collections';
import { DASHBOARD_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../constants/routes';
import useFirebaseContext from '../hooks/useFirebaseContext';
import { doesUsernameExists } from '../services/firebase';

const SignUpPage: React.FC = () => {
  const history = useHistory();
  const { firebase } = useFirebaseContext();
  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExists(username);
      if (!usernameExists) {
        try {
          const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);
          await createdUserResult.user?.updateProfile({
            displayName: username,
          });

          firebase.firestore().collection(FIREBASE_COLLECTION_USERS).add({
            userId: createdUserResult.user?.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now(),
          });

          history.push(DASHBOARD_PAGE_ROUTE);
        } catch (error) {
          setUsername('');
          setFullName('');
          setEmailAddress('');
          setPassword('');
          setError(error.message);
        }
      } else {
        setError('That username is already taken, please try another.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Instagram - Sign Up';
  });

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram app'
        />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            />
          </h1>
          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
          <form onSubmit={handleSignUp}>
            <input
              aria-label='Enter your username'
              type='text'
              placeholder='Username'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label='Enter your full name'
              type='text'
              placeholder='Full name'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Email address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              type='submit'
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <p className='text-sm'>
            Have an account?{' '}
            <Link to={LOGIN_PAGE_ROUTE} className='font-bold text-blue-medium'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
