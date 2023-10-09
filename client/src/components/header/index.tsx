
import API from "api/buildClient";

async function getData() {
  try {
    const response = await API().get("api/users/currentUser");
    return response.data;
  } catch (err:any) {
    console.error(err.message);
    
  }
}

async function Header() {
    const {currentUser} = await getData();
    console.log("Header currentUser",currentUser);
    
  return (
    <div>Header</div>
  )
}

export default Header