import Header from "@components/header";
import getCurrentUser from "api/user";
import { cloneElement } from "react";

export default async function({children}:any) {
  const {currentUser}:any = await getCurrentUser();

  return (
    <div>
      <Header currentUser={currentUser}/>
      {cloneElement(children,{currentUser})}
    </div>
  )
}
