import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {fetchRalFilters} from "@/services/api";

export const requestFilters = createAsyncThunk<Array<any> , void>(
    "filtersSlice/requestFilters", fetchRalFilters
)

export interface IFiltersSlice {
    filtersFetchStart: boolean
    filtersFetchError: SerializedError | boolean
    filters: Array<any>
}

const initialState: IFiltersSlice = {
    filtersFetchStart: false,
    filtersFetchError: false,
    filters: [],
}

const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        default: () => {},
    },
    extraReducers: builder => {
        builder.addCase(requestFilters.pending, state => {
            return {
                ...state,
                filtersFetchStart: true,
                filtersFetchError: false,
            }
        })
        builder.addCase(requestFilters.fulfilled, (state, action: PayloadAction<Array<any>>) => {
            return {
                ...state,
                filtersFetchStart: false,
                filters: action.payload
            }
        })
        builder.addCase(requestFilters.rejected, (state, action: PayloadAction<unknown>) => {
            return {
                ...state,
                    filtersFetchStart: false,
                    filtersFetchError: action.payload as SerializedError,
                }
        })
    }
})

export default filtersSlice.reducer;
