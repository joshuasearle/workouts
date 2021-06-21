import axios from 'axios';
import apiPath from './apiPath';

export default async function login(username, password) {
  const response = await axios.post(`${apiPath}/login`, {
    username,
    password,
  });
  return response;
}
