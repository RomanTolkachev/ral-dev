import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import { fetchRalFilters } from "@/services/api";
import { IRalItem } from "@/types/ral";

export const requestFilters = createAsyncThunk<any>(
    "filtersSlice/requestFilters",
    () => fetchRalFilters
        .then(res => res)
        .catch(err => Promise.reject(err))
)

export interface IFiltersSlice {
    filtersFetchStart: boolean
    filtersFetchError: SerializedError | boolean
    filters: IRalItem[] | []
    paginationQueries: {
        page: number,
        perPage: number
    }
}

const initialState: IFiltersSlice = {
    filtersFetchStart: false,
    filtersFetchError: false,
    filters: [],
    paginationQueries: {
        page: 1,
        perPage: 10
    }
}

const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        updatePage: (state, action: PayloadAction<number>) => {
            state.paginationQueries.page = action.payload;
        },
        updatePerPage: (state, action: PayloadAction<number>) => {
            state.paginationQueries.perPage = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(requestFilters.pending, state => {
            state.filtersFetchStart = true;
            state.filtersFetchError = false;
        })
        builder.addCase(requestFilters.fulfilled, (state , action) => {
            state.filtersFetchStart = false;
            state.filters = action.payload
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

export const { updatePage } = filtersSlice.actions;
export default filtersSlice.reducer;
