import { Link } from 'react-router-dom';

export default function HomePage({ token, userData }) {
  return (
    <>
      <h1>Workouts</h1>
      <p>
        The app that lets you create, manage, and use custom workouts and
        exercises.
      </p>
      {!token && (
        <Link to='/signup'>
          <button>Sign Up Here</button>
        </Link>
      )}
      {!!token && (
        <div>
          <Link to='/exercises'>
            <button>Exercises</button>
          </Link>
          <Link to='/workouts'>
            <button>Workouts</button>
          </Link>
        </div>
      )}
      <div>{JSON.stringify(userData, null, 2)}</div>
    </>
  );
}
