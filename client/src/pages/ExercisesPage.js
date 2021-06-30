import { Link } from 'react-router-dom';
import deleteExercise from '../api/deleteExercise';
import duplicateExercise from '../api/duplicateExercise';

export default function ExercisesPage({ userData, updateUserData }) {
  function onDelete(exerciseId) {
    return async (e) => {
      e.preventDefault();
      await deleteExercise(exerciseId);
      await updateUserData();
    };
  }

  function onDuplicate(exerciseId) {
    return async (e) => {
      e.preventDefault();
      await duplicateExercise(exerciseId);
      await updateUserData();
    };
  }

  return (
    <>
      <h1>Exercises</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Set Count</th>
            <th>Rep Count</th>
            <th>Rest Period</th>
          </tr>
        </thead>
        <tbody>
          {userData.exercises.map((exercise) => (
            <tr key={exercise.title}>
              <td>{exercise.title}</td>
              <td>{exercise.description}</td>
              <td>{exercise.setCount}</td>
              <td>{exercise.repCount}</td>
              <td>{exercise.secondsBreak}s</td>
              <td>
                <Link to={`/edit-exercise/${exercise._id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={onDuplicate(exercise._id)}>Duplicate</button>
              </td>
              <td>
                <button onClick={onDelete(exercise._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/add-exercise'>Add New Exercise</Link>
    </>
  );
}
