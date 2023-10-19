import getCurrentUser from "api/user";
// export const dynamic = 'force-dynamic'
export const revalidate = 10; //revalidate every 1hr seconds

const HomePage =  async()=> {
  console.log("Fom Home");
  const {currentUser}:any = await getCurrentUser();
  
  return (
    <>
    <h1>{currentUser ? "You are signed in ": "you are not sign In "}</h1>
    </>
  )
}

export default HomePage;