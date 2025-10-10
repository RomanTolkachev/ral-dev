import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosApi } from '@/shared/api/api';

interface CreateUserData {
    name: string;
    email: string;
    new_user_password: string;
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userData: CreateUserData) => {
            const response = await axiosApi.post('/create_user', userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};