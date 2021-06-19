# App for tracking your workouts

## Server Routes

### `POST /create-user`

- Creates a new user
- Requires `username` and `password` in the body of the request
- The `username` must be unique
- If server responds with `201` code, a JWT will be sent with it, which is used for future authentication

### `POST /login`

- Logs existing user in
- Requires `username` and `password` in the body of the request
- Credentials must be valid
- If server responds with `200` code, a JWT will be sent with it, which is used for future authentication

### `POST /exercises`

- Creates exercies
- Requires in the body
  - `title`
  - `description`
  - `setCount`
  - `repCount`
  - `secondsBreak`
- If server responds with `201` code, exercise json is sent along

### `DELETE /exercises`

- Removes exercise
- Requires `exerciseId` in the body

### `PUT /exercies`

- Updates exercise
- Requires
  - `exercisesId`
  - Any amount of the other paramters in the exercies object

### `POST /duplicate-exercise`

- Duplicates an existing exercise
- Requires an `exerciseId`
