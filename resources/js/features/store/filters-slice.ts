import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer'
import { FieldValues } from 'react-hook-form'

export interface IFiltersSlice {
    queries: { page: number; perPage: number }
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
        updateHookFormQueries: (state, action: PayloadAction<WritableDraft<FieldValues>>) => {
            state.currentHookFormQueries = { ...action.payload, perPage: 10 }
        },
    },
})

export const { updatePage, updateForm, updateHookFormQueries } = filtersSlice.actions
export default filtersSlice.reducer
