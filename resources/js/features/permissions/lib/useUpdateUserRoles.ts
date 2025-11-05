import { axiosApi } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserRoles = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { userId: string | number, newRoles: string[] }) => {
            const response = await axiosApi.post('/update_model_has_roles', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_has_roles'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}