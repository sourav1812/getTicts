import API from "./buildClient";

export default async function getCurrentUser() {
    try {
      const response = await API().get("api/users/currentUser");
      return response.data;
    } catch (err:any) {
      console.error(err.message);
      
    }
  }