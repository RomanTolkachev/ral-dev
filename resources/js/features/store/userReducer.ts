import { createSlice } from "@reduxjs/toolkit";

type TRalTableModel =
    'ral_short_info_view.link' |
    'nameType' |
    'nameTypeActivity' |
    'fullName' |
    'address' |
    'oaDescription' |
    'NPstatus' |
    'ral_short_info_view.id' |
    'regDate' |
    'NP_status_change_date' |
    'applicantFullName' |
    'new_status_AL' |
    'applicantINN' |
    'RegNumber' |
    'status_change_date' |
    'np_regulations_tnveds.regulation' |
    'ral_short_info_view.regulations'
 

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
            'ral_short_info_view.link',
            'status_change_date',
            'nameType',
            'new_status_AL',
            'ral_short_info_view.id',
            'applicantINN',
            'NPstatus',
            'NP_status_change_date',
            'np_regulations_tnveds.tnved',
            'ral_short_info_view.regulations',

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
