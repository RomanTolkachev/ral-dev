import {store} from "@/app";
import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "@/services/reducers/userReducer";
import ralSliceToolkit from "@/services/ral-slice";

export type IRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers(
    {
        userState: userReducer,
        ralSliceToolkit
    }
)
