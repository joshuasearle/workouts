import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage({ token, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();

    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      const responseToken = response.data;
      setToken(responseToken);
    } catch (e) {
      const message = e.response.data;
      setErrorMessage(message);
    }
  }

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
      <button onClick={handleSignUp}>Login</button>
    </>
  );
}
