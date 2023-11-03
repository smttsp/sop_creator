// redux/store.js
import { createSlice } from '@reduxjs/toolkit';
const intialState = {
    value:{
        isAuth:false,
        name:"",
        imageUrl:"",
        userId:""

    }
}

export const auth = createSlice({
   name:"auth",
   intialState,
   reducer:{
    logOut:()=>{
        return intialState
    },
    logIn:(state, action)=>{
        return {
            value:{
                isAuth:true,
                name:action.payload,
                imageUrl:action.payload,
                userId:action.payload
            }
        }
    }
   }
});
export const{logIn, logOut} = auth.action
export default auth.reducer;
