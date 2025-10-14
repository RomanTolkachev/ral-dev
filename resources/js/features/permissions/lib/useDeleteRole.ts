import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosApi } from '@/shared/api/api';

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosApi.delete(`/delete_role/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};