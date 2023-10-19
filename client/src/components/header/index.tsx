"use client"
import useRequest from 'hooks/useRequest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default ({ currentUser }:any) => {
  const {push, refresh} = useRouter();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {push('/'); refresh()}
  });

  const handleLogout = async ()=>{
    await doRequest()
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <Link prefetch={true} className="navbar-brand" href="/">
        MyBookings
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
        {!currentUser && <li className="nav-item">
          <Link prefetch={true} className="nav-link" href={"/auth/signup"}>
            Sign Up
          </Link>
        </li>}
        {!currentUser && <li className="nav-item">
          <Link prefetch={true} className="nav-link" href={"/auth/signin"}>
            Sign in
          </Link>
        </li>}
        {currentUser && <li className="nav-item">
          <div className="nav-link" onClick={handleLogout}>
            Sign out
          </div>
        </li>}
        </ul>
      </div>
    </nav>
  );
};
