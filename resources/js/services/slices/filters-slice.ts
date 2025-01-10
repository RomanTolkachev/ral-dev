import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { fetchRalFilters } from '@/services/api'
import { IRalItem } from '@/types/ral'
import { filterQueries } from '@/shared/filterQueries.ts'
import { WritableDraft } from 'immer'
import { FieldValues } from 'react-hook-form'

export const requestFilters = createAsyncThunk<any>('filtersSlice/requestFilters', () =>
    fetchRalFilters.then((res) => res).catch((err) => Promise.reject(err)),
)

export interface IFiltersSlice {
    queries: {page: number, perPage: number}
    currentHookFormQueries: FieldValues
}

const initialState: IFiltersSlice = {
    queries: {
        page: 1,
        perPage: 10,
    },
    currentHookFormQueries: {
        page: 1,
        perPage: 10,
    },
}

const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        updatePage: (state, action: PayloadAction<number>) => {
            state.queries.page = action.payload
        },
        updatePerPage: (state, action: PayloadAction<number>) => {
            state.currentHookFormQueries.perPage = action.payload
        },
        updateForm: (state, action: PayloadAction<any>) => {
            state.queries = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.queries.page = +action.payload
        },
        updateHookFormQueries: (state, action: PayloadAction<WritableDraft<FieldValues>>) => {
            state.currentHookFormQueries = {...action.payload, perPage: 10}
        }
    },
})

export const { updatePage, updateForm, setPage, updateHookFormQueries } = filtersSlice.actions
export default filtersSlice.reducer
