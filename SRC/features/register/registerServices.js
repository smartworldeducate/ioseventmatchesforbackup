import axios from "axios";
import { APIHEADER } from "../../constants/const";
const regiterServices=async(userData)=>{
  const response=await axios.post("https://app.eventmatches.com/administrator/Api/register",userData,{
    headers: {
      api_key: APIHEADER.api_key,
      api_secret:APIHEADER.api_secret,
      "Content-Type": "multipart/form-data"
  },
  })
  if(response){
      console.log("register user response",response?.data);
      return response?.data;
      
  }
}


export const registerService={
    regiterServices
}