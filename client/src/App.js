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
import ExercisesPage from './pages/ExercisesPage';
import AddExercisePage from './pages/AddExercisePage';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

export default function App() {
  const [token, setToken] = useToken();
  const [userData, updateUserData] = useUserData();
  const authenticated = !!userData && userData !== {};

  useEffect(() => {
    try {
      updateUserData();
    } catch (e) {
      setToken(null);
    }
  }, []);

  return (
    <Router>
      <Navbar authenticated={authenticated} />
      <Switch>
        <Route exact path='/login'>
          {authenticated ? (
            <Redirect to='/' />
          ) : (
            <LoginPage setToken={setToken} updateUserData={updateUserData} />
          )}
        </Route>
        <Route exact path='/signup'>
          {authenticated ? (
            <Redirect to='/' />
          ) : (
            <SignUpPage setToken={setToken} updateUserData={updateUserData} />
          )}
        </Route>
        <Route exact path='/exercises'>
          {!authenticated ? (
            <Redirect to='/' />
          ) : (
            <ExercisesPage
              updateUserData={updateUserData}
              userData={userData}
            />
          )}
        </Route>
        <Route exact path='/add-exercise'>
          {!authenticated ? (
            <Redirect to='/' />
          ) : (
            <AddExercisePage updateUserData={updateUserData} />
          )}
        </Route>
        <Route exact path='/' userData={userData}>
          <HomePage userData={userData} authenticated={authenticated} />
        </Route>
      </Switch>
    </Router>
  );
}
