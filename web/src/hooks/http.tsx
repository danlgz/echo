import { useMutation, useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http';
import type { Room, VerifyOTPResult } from '@/types';

export function useRequestOTP() {
  const mutation = useMutation({
    mutationFn: async (payload: { email: string }) => {
      await httpClient.post('/users/otp/send', payload);
    },
  });

  return mutation;
}

export function useVerifyOTP() {
  const mutation = useMutation({
    mutationFn: async (payload: { email: string; code: string }) => {
      const response = await httpClient.post<VerifyOTPResult>(
        '/users/otp/verify',
        payload,
      );
      return response.data;
    },
  });

  return mutation;
}

export function useGetRooms() {
  const query = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await httpClient.get<Room[]>('/rooms');
      return response.data;
    },
  });

  return query;
}
