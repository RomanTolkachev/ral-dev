import { createSlice } from "@reduxjs/toolkit";

type TRalTableModel =
    'link' |
    'nameType' |
    'nameTypeActivity' |
    'fullName' |
    'address' |
    'oaDescription' |
    'NPstatus' |
    'id' |
    'regDate' |
    'NP_status_change_date' |
    'applicantFullName' |
    'new_status_AL' |
    'nameType' |
    'applicantINN' |
    'RegNumber' |
    'status_change_date' |
    'id'

export interface IUserReducer {
    user: any;
    settings: {
        ralTableColumns: Array<TRalTableModel>
        userFilters: Array<TRalTableModel>
    }
}

const initialState = {
    user: 'Hi I am user',
    settings: {
        ralTableColumns: [
            'fullName',
            'regDate',
            'link',
            'status_change_date',
            'new_status_AL',
            'id',
            'RegNumber',
            'applicantINN',
            'fullName',
        ] as Array<TRalTableModel>,
        userFilters: [
            'new_status_AL',
            'regDate',
            'status_change_date',
            'NPstatus'
        ] as Array<TRalTableModel>,

    }
};

export const userReducer = (
    state: IUserReducer = initialState,
    action: any,
): IUserReducer => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export default userState.reducer
