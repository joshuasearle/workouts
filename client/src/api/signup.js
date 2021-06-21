import axios from 'axios';
import apiPath from './apiPath';

export default async function signup(username, password) {
  const response = await axios.post(`${apiPath}/create-user`, {
    username,
    password,
  });
  return response;
}
