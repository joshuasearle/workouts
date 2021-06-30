import axios from 'axios';
import apiPath from './apiPath';

export default async function deleteWorkout(workoutId) {
  await axios.delete(`${apiPath}/workouts`, {
    data: { workoutId },
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
    },
  });
}
