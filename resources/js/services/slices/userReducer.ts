export interface IUserReducer {
    user: any
}
const initialState = {
    user: "Hi I am user"
};

export const userReducer = (state: IUserReducer = initialState, action: any): IUserReducer => {
    switch (action.type) {
        default: {
            return state
        }
    }
}
