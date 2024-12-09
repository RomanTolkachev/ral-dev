import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSlice,
    PayloadAction,
    SerializedError
} from "@reduxjs/toolkit";
import {fetchRal} from "@/services/api";
import {ralItem} from "@/types/ral";

export interface IRalReducer {
    ralFetchStart: boolean
    ralFetchError?: SerializedError | null
    ralData: [] | Array<ralItem>
}
const initialState: IRalReducer = {
    ralFetchStart: false,
    ralFetchError: null,
    ralData: []
};

export const requestRal = createAsyncThunk(
    'ralSliceName/requestRal', fetchRal
)


const ralSliceAsync = createReducer(
    initialState,
    (builder) => {
        builder.addCase(requestRal.pending, state => {
            return {
                ...state, ralFetchStart: true,
            }
        })
        builder.addCase(requestRal.fulfilled, (state, action: PayloadAction<Array<any>>) => {
            return {
                ...state,
                ralFetchStart: false,
                ralData: action.payload
            }
        })
        builder.addCase(requestRal.rejected, (state, action) => {
            return {
                ...state,
                ralFetchStart: false,
                ralFetchError: action.error as SerializedError
            }
        })
    })


// const ralSliceToolkit = createSlice(
//     {
//         name: "ralSliceName",
//         initialState,
//         slices: {
//             fetchRalStart: (state):IRalReducer => {
//                 return {
//                     ...state,
//                     ralFetchStart: true,
//                 }
//             },
//             updateRalData: (state, payload):IRalReducer => {
//                 return {
//                     ...state,
//                     ralFetchError: false,
//                 }
//             }
//         },
//         extraReducers: builder => {
//             builder.addCase(requestRal.pending, state => {
//                 return {
//                     ...state, ralFetchStart: true,
//                 }
//             })
//             builder.addCase(requestRal.fulfilled, (state, action:PayloadAction<Array<any>>) => {
//                 return {
//                     ...state,
//                     ralFetchStart: false,
//                     ralData: action.payload
//                 }
//             })
//             builder.addCase(requestRal.rejected, (state, action) => {
//                 return {
//                     ...state,
//                     ralFetchStart: false,
//                     ralFetchError: action.payload
//                 }
//             })
//         }
//     }
// )

export default ralSliceAsync;
