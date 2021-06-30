import axios from 'axios';
import apiPath from './apiPath';

export default async function updateExercise(
  exerciseId,
  title,
  description,
  setCount,
  repCount,
  secondsBreak
) {
  await axios.put(
    `${apiPath}/exercises`,
    { title: title, description, setCount, repCount, secondsBreak, exerciseId },
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('workoutsJWT')}`,
      },
    }
  );
}
