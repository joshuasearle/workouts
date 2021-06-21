import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import signup from '../api/signup';

export default function SignUpPage({ token, setToken, updateUserData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();

    setErrorMessage('');

    try {
      const response = await signup(username, password);
      const responseToken = response.data;
      setToken(responseToken);
      await updateUserData();
      setRedirect(true);
    } catch (e) {
      const message = e.response.data;
      setErrorMessage(message);
    }
  }

  if (redirect) return <Redirect to='/' />;

  return (
    <>
      <label>Username</label>
      <br />
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Password</label>
      <br />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {!!errorMessage && errorMessage}
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
}
