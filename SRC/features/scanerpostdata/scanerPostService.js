import axios from "axios";
import { APIHEADER } from "../../constants/const";
const scanerPostServices=async(userData)=>{
    const response=await axios.post("https://app.eventmatches.com/administrator/Api/saveAttendance",userData,{
        headers: {
            api_key: APIHEADER.api_key,
            api_secret:APIHEADER.api_secret,
            "Content-Type": "multipart/form-data"
        },
      })
    // console.log("userdata==",userData);
    if(response){
        // console.log("verify email response",response?.data);
        return response?.data;
        
    }
}


export const scanerPostService={
    scanerPostServices
}