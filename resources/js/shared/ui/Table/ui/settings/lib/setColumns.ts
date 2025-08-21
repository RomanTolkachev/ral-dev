import { axiosApi } from "@/shared/api/api";

export type TParams = {
    settings: string[]
}

export const setColumns = (newSetting: TParams, tableName: string): Promise<void> => {
    return axiosApi.post('/set_settings', {
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