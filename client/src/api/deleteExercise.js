import axios from 'axios';
import apiPath from './apiPath';

export default async function deleteExercise(exerciseId) {
  await axios.delete(`${apiPath}/exercises`, {
    data: { exerciseId },
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
    },
  });
}
