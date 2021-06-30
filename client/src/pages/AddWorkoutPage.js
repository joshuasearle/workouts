import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import createWorkout from '../api/createWorkout';

export default function AddWorkoutPage({ updateUserData }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    await createWorkout(title, desc);
    await updateUserData();
    setDone(true);
  }

  if (done) return <Redirect to='/workouts' />;

  return (
    <>
      <h1>Add Workout</h1>
      <label>Title</label>
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
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
