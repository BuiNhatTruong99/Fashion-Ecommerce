import { IAuthResponse, ISignIn } from '@/domains/auth.domain';
import { loginService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';

export const useSignInMutation = () => {
  return useMutation<IAuthResponse, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.LOGIN],
    mutationFn: (value: ISignIn) => loginService(value)
  });
};
