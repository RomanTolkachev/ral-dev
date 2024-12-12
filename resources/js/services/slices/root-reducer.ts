import {store} from "@/app";
import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "@/services/slices/userReducer";
import ralSliceToolkit from "@/services/slices/ral-slice";
import filtersReducer from "@/services/slices/filters-slice";

export type IRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers(
    {
        userState: userReducer,
        ralSliceToolkit,
        filtersReducer,
    }
)
