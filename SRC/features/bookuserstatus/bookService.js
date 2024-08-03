import axios from "axios";
import { APIHEADER } from "../../constants/const";
const bookService=async(userData)=>{
    const response=await axios.post("https://app.eventmatches.com/administrator/Api/bookUserSchedule",userData,{
        headers: {
            api_key: APIHEADER.api_key,
            api_secret:APIHEADER.api_secret,
            "Content-Type": "multipart/form-data"
        },
      })
    if(response){
        return {
            responseData: response.data,
            userData: userData
        };
        
    }
}


export const bookServices={
    bookService
}