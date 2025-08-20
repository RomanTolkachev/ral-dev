import { axiosApi } from "@/shared/api/api";

export type TParams = {
    userId: string,
    settings: string[]
}

export const setColumns = (newSetting: TParams, tableName: string): Promise<void> => {
    return axiosApi.post('/set_settings', {
        user_id: newSetting.userId.toString(),
        table_name: tableName,
        settings: newSetting.settings,
    }, {
        withCredentials: true,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json',
        }
    });
}