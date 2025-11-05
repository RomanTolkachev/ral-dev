import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosApi } from '@/shared/api/api';

interface CreateUserData {
    role_name: string;
}

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userData: CreateUserData) => {
            const response = await axiosApi.post('/create_role', userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};