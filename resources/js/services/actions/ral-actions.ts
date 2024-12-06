import {AppThunk} from "@/types/global";
import {TRalActions} from "@/types/ral";
import {fetchRal} from "@/services/api";

export const RAL_FETCH_START:"RAL_FETCH_START" = "RAL_FETCH_START";
export const RAL_FETCH_SUCCESS:"RAL_FETCH_SUCCESS" = "RAL_FETCH_SUCCESS";
export const RAL_FETCH_FAIL:"RAL_FETCH_FAIL" = "RAL_FETCH_FAIL";
export const RAL_UPDATE_DATA:"RAL_UPDATE_DATA" = "RAL_UPDATE_DATA";

export const ralRequestSent = ():TRalActions => {
    return {
        type: RAL_FETCH_START
    }
}
export const ralRequestSuccess = ():TRalActions => {
    return {
        type: RAL_FETCH_SUCCESS
    }
}
export const ralRequestFail = ():TRalActions => {
    return {
        type: RAL_FETCH_FAIL,
        payload: 0
    }
}

export const ralUpdateData = (ralResponse: Array<any>):TRalActions => {
    return {
        type: RAL_UPDATE_DATA,
        payload: ralResponse
    }
}

export const requestRalData = ():AppThunk => {
    return dispatch => {
        dispatch(ralRequestSent());
        fetchRal().then(res => ralUpdateData(res))
    }
}
