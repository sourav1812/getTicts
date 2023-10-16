'use client'
import useRequest from "hooks/useRequest";
import Link from "next/link"
import { useRouter } from "next/navigation";

function Header({currentUser}:any) {
  const {push}  = useRouter();

  const { doRequest, errors }:any = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: ()=>push("/")
  });

   const onLogout = async ()=>{
    console.log("sadghjsdg");
    
      await doRequest();
   }

  return (
    <nav className="header">
      <Link href="/">Booking my tickets</Link>
      {!currentUser ? <div>
        <Link href="/auth/signin" className="mr-20">Sign in</Link>
        <Link href="/auth/signup">Sign up</Link>
      </div>: <button type="button" className="btn btn-link" onClick={onLogout}>Signout</button>}
    </nav>
  )
}

export default Header