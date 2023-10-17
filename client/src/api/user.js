import { cache } from "react";
import API from "./buildClient";

const getCurrentUser = cache(async()=> {
    try {
      const response = await API().get("api/users/currentUser");
      return response.data;
    } catch (err) {
      console.error("Error: ",err.message);
      
    }
})

export const getUserLogout = async()=> {
  try {
    const response = await API().get("api/users/signout");
    return response.data;
  } catch (err) {
    console.error("Error: ",err.message);
    
  }
}

export default getCurrentUser;