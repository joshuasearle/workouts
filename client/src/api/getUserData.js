import axios from 'axios';
import apiPath from './apiPath';

export default async function getUserData() {
  const response = await axios.get(`${apiPath}/user`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
    },
  });
  return response.data;
}
