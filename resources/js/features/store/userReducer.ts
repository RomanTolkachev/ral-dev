import { IUser } from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ralColumns = [
    'ral_short_info_view.link',
    'nameType',
    'nameTypeActivity',
    'fullName',
    'address',
    'oaDescription',
    'NPstatus',
    'ral_short_info_view.id',
    'regDate',
    'NP_status_change_date',
    'applicantFullName',
    'new_status_AL',
    'applicantINN',
    'applicantINN',
    'RegNumber',
    'status_change_date',
    'np_regulations_tnveds.regulation',
    'ral_short_info_view.regulations'
] as const;

type TRalTableModel = typeof ralColumns[number];
 

export interface IUserReducer {
    user: IUser | null;
    settings: {
        ralTableColumns: Array<TRalTableModel>
        userFilters: Array<TRalTableModel>
    }
}

const initialState: IUserReducer = {
    user: null,
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
        userFilters: [
            'new_status_AL',
            'regDate',
            'status_change_date',
            'nameType',
            'NPstatus',
            'NP_status_change_date',
        ] as Array<TRalTableModel>,
    }
};

const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userState.actions;
export default userState.reducer
