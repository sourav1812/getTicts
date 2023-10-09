import getCurrentUser from "api/user";

const HomePage =  async()=> {
  const {currentUser} = await getCurrentUser();
  console.log("currentUser",currentUser);
  
  return (
    <h1>{currentUser ? "You are signed in": "you are not sign In"}</h1>
  )
}

export default HomePage;