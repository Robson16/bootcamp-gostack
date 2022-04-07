import { renderHook } from '@testing-library/react-hooks';

import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hooks', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@example.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('test@example.com');
  });
});
