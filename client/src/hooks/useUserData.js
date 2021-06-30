import { useState, useCallback } from 'react';
import getUserData from '../api/getUserData';

export default function useUserData() {
  const [userData, setUserData] = useState(null);

  const updateUserData = useCallback(async (token) => {
    if (!localStorage.getItem('workoutsJWT')) return;
    try {
      const userData = await getUserData();
      setUserData(userData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return [userData, updateUserData];
}
