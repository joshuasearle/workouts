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
import EditExercisePage from './pages/EditExercisePage';
import WorkoutsPage from './pages/WorkoutsPage';
import AddExercisePage from './pages/AddExercisePage';
import AddWorkoutPage from './pages/AddWorkoutPage';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

export default function App() {
  const setToken = useToken()[1];
  const [userData, updateUserData] = useUserData();
  const authenticated = !!userData && userData !== {};

  useEffect(() => {
    try {
      updateUserData();
    } catch (e) {
      setToken(null);
    }
  }, [updateUserData, setToken]);

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
        <Route exact path='/add-workout'>
          {!authenticated ? (
            <Redirect to='/' />
          ) : (
            <AddWorkoutPage updateUserData={updateUserData} />
          )}
        </Route>
        <Route exact path='/edit-exercise/:exerciseId'>
          {!authenticated ? (
            <Redirect to='/' />
          ) : (
            <EditExercisePage
              updateUserData={updateUserData}
              userData={userData}
            />
          )}
        </Route>
        <Route exact path='/workouts'>
          {!authenticated ? (
            <Redirect to='/' />
          ) : (
            <WorkoutsPage updateUserData={updateUserData} userData={userData} />
          )}
        </Route>
        <Route exact path='/' userData={userData}>
          <HomePage userData={userData} authenticated={authenticated} />
        </Route>
      </Switch>
    </Router>
  );
}
