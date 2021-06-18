import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/users';
    axios
      .get(url)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/users';
    axios.post(url, {
      username,
      password,
    });
  };

  return (
    <div>
      <div>{users && users.map((user) => user.username).join(', ')}</div>
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
        type='text'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
