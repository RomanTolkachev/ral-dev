type TRalTableColumns =
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
    'regDate' |
    'applicantINN' |
    'RegNumber' |
    'status_change_date'

export interface IUserReducer {
    user: any;
    settings: {
        ralTableColumns: Array<TRalTableColumns>
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
        ] as Array<TRalTableColumns>
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
