import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = `http://${process.env.REACT_APP_API_PATH}/users`;
    axios
      .get(url)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  });
  return <div>{users && users.map((user) => user.username)}</div>;
}
