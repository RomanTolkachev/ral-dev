import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSlice,
    PayloadAction,
    SerializedError
} from "@reduxjs/toolkit";
import {fetchRal} from "@/services/api";
import {IRalItem} from "@/types/ral";

export interface IRalReducer {
    ralFetchStart: boolean
    ralFetchError?: SerializedError | null
    ralData: [] | Array<IRalItem>
    headers: string[]
    filters: any
}
const initialState: IRalReducer = {
    ralFetchStart: false,
    ralFetchError: null,
    ralData: [],
    headers: [],
    filters: null
};


export const requestRal = createAsyncThunk<Array<IRalItem>, Object>( // @ts-ignore
    'ralSlice/requestRal', fetchRal
)

const getHeaders = (data: Array<IRalItem>): Array<string> => {
    return data.length !== 0 ? Object.keys(data[0]) : [] // вытаскиваем ключи в массив - это будут заголовки
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
            builder.addCase(requestRal.pending, state => {
                return {
                    ...state,
                    ralData: [],
                    ralFetchStart: true,
                }
            })
            builder.addCase(requestRal.fulfilled, (state, action:PayloadAction<Array<IRalItem>>) => {
                return {
                    ...state,
                    ralFetchStart: false,
                    ralData: action.payload,
                    headers: getHeaders(action.payload),

                }
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
