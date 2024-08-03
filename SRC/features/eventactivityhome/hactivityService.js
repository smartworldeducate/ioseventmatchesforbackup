import axios from "axios";
import { APIHEADER } from "../../constants/const";
const activityServices=async(userData)=>{
    const response=await axios.post("https://app.eventmatches.com/administrator/Api/eventActivities",userData,{
        headers: {
            api_key: APIHEADER.api_key,
            api_secret:APIHEADER.api_secret,
            "Content-Type": "multipart/form-data"
        },
      })
    // console.log("userdata==",userData);
    if(response){
        // console.log("activity data response",response?.data);
        return {
            responseData: response.data,
            userData: userData
        };
        
    }
}


export const activityHomeService={
    activityServices
}