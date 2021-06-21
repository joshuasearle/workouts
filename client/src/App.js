import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useToken from './hooks/useToken';
import useUserData from './hooks/useUserData';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useEffect } from 'react';

export default function App() {
  const [token, setToken] = useToken();
  const [userData, updateUserData] = useUserData();

  useEffect(() => {
    try {
      updateUserData();
    } catch (e) {
      setToken(null);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          {!!token && <Redirect to='/' />}
          <LoginPage setToken={setToken} updateUserData={updateUserData} />
        </Route>
        <Route exact path='/signup'>
          {!!token && <Redirect to='/' />}
          <SignUpPage setToken={setToken} updateUserData={updateUserData} />
        </Route>
        <Route exact path='/' userData={userData}>
          <HomePage userData={userData} />
        </Route>
      </Switch>
    </Router>
  );
}
