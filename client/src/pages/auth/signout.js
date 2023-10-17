import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/navigation';

export default () => {
  const {push} = useRouter()
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};
