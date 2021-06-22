import { Link } from 'react-router-dom';

export default function HomePage({ authenticated, userData }) {
  const authButton = <Link to='/workouts'>View Workouts</Link>;
  const unAuthButtons = (
    <>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </>
  );

  const callToAction = authenticated ? authButton : unAuthButtons;

  return (
    <>
      <p>
        The app that lets you create, manage, and use custom workouts and
        exercises.
      </p>
      {callToAction}
    </>
  );
}
