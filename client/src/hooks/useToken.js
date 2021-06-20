import { useState, useEffect } from 'react';

export default function useToken() {
  const [token, setToken] = useState(null);

  const localStorageName = 'workoutsJWT';

  useEffect(() => {
    const localStorageToken = window.localStorage.getItem(localStorageName);
    setToken(localStorageToken);
  }, []);

  function newSetToken(newToken) {
    localStorage.setItem(localStorageName, newToken);
    setToken(newToken);
  }

  return [token, newSetToken];
}
