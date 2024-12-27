import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSlice,
    PayloadAction,
    SerializedError
} from "@reduxjs/toolkit";
import {fetchRal} from "@/services/api";
import {IRalItem, TPaginatedRal} from "@/types/ral";

export interface IRalReducer {
    ralFetchStart: boolean
    ralFetchError?: SerializedError | null
    ralData: TPaginatedRal | {data: [], current_page: number, last_page: number}
    headers: string[]
    filters: any
}
const initialState: IRalReducer = {
    ralFetchStart: false,
    ralFetchError: null,
    ralData: {data: [], current_page: 1, last_page: 0},
    headers: [],
    filters: null
};


export const requestRal  = createAsyncThunk<any>( // @ts-ignore
    'ralSlice/requestRal', queries => fetchRal(queries).then(res => res)
        .catch(err => console.log(err))
)

const getHeaders = (rals: IRalItem[]): string[] => {
    return rals.length !== 0 ? Object.keys(rals[0]) : []// вытаскиваем ключи в массив - это будут заголовки
}

// const ralSliceAsync = createReducer(
//     initialState,
//     (builder) => {
//         builder.addCase(requestRal.pending, state => {
//             return {
//                 ...state, ralFetchStart: true,
//             }
//         })
//         builder.addCase(requestRal.fulfilled, (state, action: PayloadAction) => {
//             return {
//                 ...state,
//                 ralFetchStart: false,
//                 ralData: action.payload
//             }
//         })
//         builder.addCase(requestRal.rejected, (state, action) => {
//             return {
//                 ...state,
//                 ralFetchStart: false,
//                 ralFetchError: action.error as SerializedError
//             }
//         })
//     })


const ralSlice = createSlice(
    {
        name: "ralSliceName",
        initialState,
        reducers: {
            fetchRalStart: (state):IRalReducer => {
                return {
                    ...state,
                    ralFetchStart: true,
                }
            },
            updateRalData: (state, payload):IRalReducer => {

                return {
                    ...state, // @ts-ignore
                    ralFetchError: false,
                }
            }
        },
        extraReducers: builder => {
            // @ts-ignore
            builder.addCase(requestRal.pending, state => {
                return {
                    ...state,
                    ralData: {data: []},
                    ralFetchStart: true,
                }
            })
            builder.addCase(requestRal.fulfilled, (state, action:PayloadAction<TPaginatedRal>) => {
                state.ralFetchStart = false;
                state.ralData = action.payload;
                state.headers = getHeaders(action.payload.data);
            })
            builder.addCase(requestRal.rejected, (state, action: PayloadAction<unknown>) => {
                return {
                    ...state,
                    ralFetchStart: false,
                    ralFetchError: action.payload as SerializedError,
                }
            })
        }
    }
)

export default ralSlice.reducer;
