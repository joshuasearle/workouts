import axios from 'axios';
import apiPath from './apiPath';

export default async function createWorkout(title, description) {
  await axios.post(
    `${apiPath}/workouts`,
    { title: title, description },
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
      },
    }
  );
}
