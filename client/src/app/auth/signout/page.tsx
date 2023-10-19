"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useRequest from 'hooks/useRequest'

export default () => {
  const {push, refresh} = useRouter();
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {push('/'); refresh()}
  });
  
  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};
