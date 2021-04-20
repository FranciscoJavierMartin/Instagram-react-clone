import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Instagram - Login';
  });

  return <div>Login</div>;
};

export default LoginPage;
