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
    'applicantINN' |
    'RegNumber' |
    'status_change_date' |
    'id'  

type TAccreditationAreaModel =
    'nov_GOTS' |
    'nov_TNVED' |
    'comparable_GOTS' |
    'comparable_TNVED' 

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
            'applicantFullName',
            'RegNumber',
            'regDate',
            'link',
            'status_change_date',
            'nameType',
            'new_status_AL',
            'id',
            'applicantINN',
            'NPstatus',
            'NP_status_change_date'
        ] as Array<TRalTableModel>,
        AccreditationAreaColumns: [
            'nov_GOTS',
            'nov_TNVED',
            'comparable_GOTS',
            'comparable_TNVED'
        ] as Array<TAccreditationAreaModel>,
        userFilters: [
            'new_status_AL',
            'regDate',
            'status_change_date',
            'nameType',
            'NPstatus',
            'NP_status_change_date'
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
