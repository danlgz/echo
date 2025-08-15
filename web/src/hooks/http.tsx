import { useMutation } from '@tanstack/react-query';
import httpClient from '@/lib/http';
import type { VerifyOTPResult } from '@/types';

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
