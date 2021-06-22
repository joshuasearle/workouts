import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import createExercise from '../api/createExercise';

export default function AddExercisePage({ updateUserData }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [setCount, setSetCount] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [rest, setRest] = useState(0);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    await createExercise(title, desc, setCount, repCount, rest);
    await updateUserData();
    setDone(true);
  }

  if (done) return <Redirect to='/exercises' />;

  return (
    <>
      <h1>Add Exercise</h1>
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
