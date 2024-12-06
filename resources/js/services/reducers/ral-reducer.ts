import {RAL_FETCH_FAIL, RAL_FETCH_START, RAL_FETCH_SUCCESS, RAL_UPDATE_DATA} from "@/services/actions/ral-actions";
import {TRalActions} from "@/types/ral";

export interface IRalReducer {
    ralFetchStart: boolean
    ralFetchSuccess: boolean
    ralFetchFail: boolean
    ralFetchError?: null
    ralData: Array<any>
}
const initialState = {
    ralFetchStart: false,
    ralFetchSuccess: false,
    ralFetchFail: false,
    ralFetchError: null,
    ralData: []
};

export const ralReducer = (state: IRalReducer = initialState, action: TRalActions): IRalReducer => {
    switch (action.type) {
        case RAL_FETCH_START: {
            return {
                ...state,
                ralFetchFail: false,
                ralFetchStart: true,
            }
        }
        case RAL_FETCH_SUCCESS: {
            return {
                ...state,
                ralFetchStart: false,
                ralFetchSuccess: true,
            }
        }
        case RAL_FETCH_FAIL: {
            return {
                ...state,
                ralFetchStart: false,
                ralFetchFail: true,
            }
        }
        case RAL_UPDATE_DATA: {
            return {
                ...state,
                ralData: [...action.payload]
            }
        }
        default: {
            return state
        }
    }
}
