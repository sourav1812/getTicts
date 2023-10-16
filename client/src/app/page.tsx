import Header from "@components/header";
import getCurrentUser from "api/user";
export const revalidate = 10; //revalidate every 1hr seconds

const HomePage =  async()=> {
  const {currentUser}:any = await getCurrentUser();
  
  return (
    <>
    <Header currentUser={currentUser}/>
    <h1>{currentUser ? "You are signed in ": "you are not sign In "}</h1>
    </>
  )
}

export default HomePage;