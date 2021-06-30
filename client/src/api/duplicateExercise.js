import axios from 'axios';
import apiPath from './apiPath';

export default async function duplicateExercises(exerciseId) {
  await axios.post(
    `${apiPath}/duplicate-exercise`,
    { exerciseId },
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
      },
    }
  );
}
