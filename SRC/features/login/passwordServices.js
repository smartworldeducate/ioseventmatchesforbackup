import axios from "axios";

const verifyPasswordServices=async(userData)=>{
    const response=await axios.post("https://app.eventmatches.com/administrator/Api/validate",userData,{
        headers: {
            "Content-Type": "multipart/form-data"
        },
      })
    console.log("userdata==",userData);
    if(response){
        console.log("verify password response",response?.data);
        return response?.data;
        
    }
}


export const passwordService={
    verifyPasswordServices
}