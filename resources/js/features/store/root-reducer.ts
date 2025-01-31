import { store } from '@/app';
import { combineReducers } from '@reduxjs/toolkit';
import filtersReducer from '@/features/store/filters-slice';
import userState from '@/features/store/userReducer';

export type IRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers({
    userState,
    filtersReducer,
});
