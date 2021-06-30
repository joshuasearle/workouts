import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import updateExercise from '../api/updateExercise';

export default function EditExercisePage({ updateUserData, userData }) {
  const { exerciseId } = useParams();
  const exercise = userData.exercises.find(
    (exercise) => (exercise._id = exerciseId)
  );
  console.log(exercise);

  const [title, setTitle] = useState(exercise.title);
  const [desc, setDesc] = useState(exercise.description);
  const [setCount, setSetCount] = useState(exercise.setCount);
  const [repCount, setRepCount] = useState(exercise.repCount);
  const [rest, setRest] = useState(exercise.secondsBreak);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    await updateExercise(exerciseId, title, desc, setCount, repCount, rest);
    await updateUserData();
    setDone(true);
  }

  if (done) return <Redirect to='/exercises' />;

  return (
    <>
      <h1>Edit Exercise</h1>
      <label>Name</label>
      <br />
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Description</label>
      <br />
      <input
        type='text'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <label>Set Count</label>
      <br />
      <input
        type='number'
        value={setCount}
        onChange={(e) => setSetCount(e.target.value)}
      />
      <br />
      <label>Rep Count</label>
      <br />
      <input
        type='number'
        value={repCount}
        onChange={(e) => setRepCount(e.target.value)}
      />
      <br />
      <label>Rest Period (seconds)</label>
      <br />
      <input
        type='number'
        value={rest}
        onChange={(e) => setRest(e.target.value)}
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
