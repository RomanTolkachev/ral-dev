import {RAL_FETCH_FAIL, RAL_FETCH_START, RAL_FETCH_SUCCESS, RAL_UPDATE_DATA} from "@/services/actions/ral-actions";

interface IRalFetchStart {
    type: typeof RAL_FETCH_START
}

interface IRalFetchSuccess {
    type: typeof RAL_FETCH_SUCCESS
}

interface IRalFetchFail {
    type: typeof RAL_FETCH_FAIL
    payload: any
}

interface IRalUpdateData {
    type: typeof RAL_UPDATE_DATA
    payload: any
}

export type TRalActions = IRalFetchStart | IRalFetchSuccess | IRalFetchFail | IRalUpdateData;
