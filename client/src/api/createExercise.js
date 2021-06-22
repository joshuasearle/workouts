import axios from 'axios';
import apiPath from './apiPath';

export default async function createExercise(
  title,
  description,
  setCount,
  repCount,
  secondsBreak
) {
  await axios.post(
    `${apiPath}/exercises`,
    { title: title, description, setCount, repCount, secondsBreak },
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
      },
    }
  );
}
