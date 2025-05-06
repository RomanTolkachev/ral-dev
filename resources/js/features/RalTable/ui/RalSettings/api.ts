import { axiosApi } from "@/shared/api/api";
import { TRalModel } from "../../model/types";

export type TParams = {
    userId: string,
    settings: TRalModel[]
}

export const setSettings = (newSetting: TParams): Promise<void> => {
    return axiosApi.post('/set_settings', {
        user_id: newSetting.userId.toString(),
        table_name: "ral_short_info_view",
        settings: newSetting.settings,
    }, {
        withCredentials: true,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }
    });
}