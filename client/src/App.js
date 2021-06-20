import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useToken from './hooks/useToken';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [token, setToken] = useToken();

  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          {!!token && <Redirect to='/' />}
          <LoginPage token={token} setToken={setToken} />
        </Route>
        <Route exact path='/signup'>
          {!!token && <Redirect to='/' />}
          <SignUpPage token={token} setToken={setToken} />
        </Route>
        <Route exact path='/'>
          <HomePage token={token} />
        </Route>
      </Switch>
    </Router>
  );
}
