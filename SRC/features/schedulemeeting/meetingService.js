import axios from "axios";
import { APIHEADER } from "../../constants/const";
const meetingServices=async(userData)=>{
    const response=await axios.post("https://app.eventmatches.com/administrator/Api//scheduleReport",userData,{
        headers: {
            api_key: APIHEADER.api_key,
            api_secret:APIHEADER.api_secret,
            "Content-Type": "multipart/form-data"
        },
      })
    // console.log("userdata==",userData);
    if(response){
        // console.log("attendee  data response",response?.data?.response?.detail[2]);
        return response.data;
        
    }
}


export const meetingService={
    meetingServices
}