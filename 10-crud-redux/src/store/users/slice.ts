import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_STATE = [
  {
    id: '4b2a1355-d9eb-404c-8c32-7704a6f74fa7',
    name: 'Alejandro Sanchez Lopez',
    email: 'alejandrosanchez@email.com',
    github: 'alesnchz8',
  },
  {
    id: '2af8e1c9-712f-4ad4-a2ef-5730e9c1185e',
    name: 'Angel Arturo Morales Rodriguez',
    email: 'angelarturo@email.com',
    github: 'Angel-Morales-R',
  },
  {
    id: '957724a3-a800-4dac-b663-c9d3879f2ec9',
    name: 'Hector Manuel Santos Bautista',
    email: 'hectormanuel@email.com',
    github: 'hectormanueljsx',
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__');

  if (persistedState != null) return JSON.parse(persistedState).users;

  return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();

      state.push({ id, ...action.payload });
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;

      return state.filter(user => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);

      if (!isUserAlreadyDefined) {
        state.push(action.payload);
      }
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
