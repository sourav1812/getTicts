import { cache } from "react";
import API from "./buildClient";
import axios from "axios";

const getCurrentUser = cache(async()=> {
    try {
      console.log("invoked getCurrentUser");
      
      const response = await API().get("api/users/currentUser");
      return response.data;
    } catch (err:any) {
      console.error("Error: ",err.message);
      
    }
})

export const getUserLogout = async()=> {
  try {
    const response = await API().get("api/users/signout");
    return response.data;
  } catch (err:any) {
    console.error("Error: ",err.message);
    
  }
}

export default getCurrentUser;