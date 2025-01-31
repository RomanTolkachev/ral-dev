import { store } from '@/app';
import { combineReducers } from '@reduxjs/toolkit';
import filtersReducer from '@/services/slices/filters-slice';
import userState from '@/services/slices/userReducer';

export type IRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers({
    userState,
    filtersReducer,
});
