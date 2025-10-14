import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosApi } from '@/shared/api/api';

interface DeleteUserData {
    id: string
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userData: DeleteUserData) => {
            const response = await axiosApi.post('/delete_user', userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};