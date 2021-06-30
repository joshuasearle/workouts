import { Link } from 'react-router-dom';
import deleteWorkout from '../api/deleteWorkout';

export default function WorkoutsPage({ userData, updateUserData }) {
  function onDelete(workoutId) {
    return async (e) => {
      e.preventDefault();
      await deleteWorkout(workoutId);
      await updateUserData();
    };
  }

  return (
    <>
      <h1>Workouts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {userData.workouts.map((workout) => (
            <tr key={workout.title}>
              <td>{workout.title}</td>
              <td>{workout.description}</td>
              <td>
                <button>View Exercises</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Duplicate</button>
              </td>
              <td>
                <button onClick={onDelete(workout._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/add-workout'>Add New Workout</Link>
    </>
  );
}
