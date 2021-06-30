import { useState } from 'react';
import getUserData from '../api/getUserData';

export default function useUserData() {
  const [userData, setUserData] = useState(null);

  async function updateUserData(token) {
    if (!localStorage.getItem('workoutsJWT')) return;
    try {
      const userData = await getUserData();
      setUserData(userData);
    } catch (e) {
      console.log(e);
    }
  }

  return [userData, updateUserData];
}
