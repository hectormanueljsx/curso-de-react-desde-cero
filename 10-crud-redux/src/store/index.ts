import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import usersReducer, { rollbackUser } from './users/slice';

const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action;
  const previousState = store.getState() as RootState;

  next(action);

  if (type === 'users/deleteUserById') {
    const userIdToRemove: string = payload;
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove);

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then(res => {
        // if (res.ok) {
        //   toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
        // }

        throw new Error('Error al eliminar el usuario');
      })
      .catch(err => {
        toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
        if (userToRemove != null) store.dispatch(rollbackUser(userToRemove));
        console.log(err);
      });
  }
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
