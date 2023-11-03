import { configureStore } from '@reduxjs/toolkit';
import { auth } from './features/auth-slice';

const store = configureStore({
  reducer:{

  }
});

export default store;