import { Link } from 'react-router-dom';

export default function Navbar({ authenticated }) {
  const authTabs = [
    { name: 'Exercises', path: '/exercises' },
    { name: 'Workouts', path: '/workouts' },
  ];

  const unAuthTabs = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  const tabs = authenticated ? authTabs : unAuthTabs;

  return (
    <nav>
      <Link to='/'>
        <h1>Workouts</h1>
      </Link>
      <div>
        {tabs.map((tab) => (
          <Link to={tab.path}>{tab.name}</Link>
        ))}
      </div>
    </nav>
  );
}
