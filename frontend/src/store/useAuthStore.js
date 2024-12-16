import {create} from "zustand"
import { axiosInstant } from "../lib/axios";

export const useAuthStore =  create((set)=>({
    authUser:null,
    isSigningUp:false,
    isSigningIn: false,
    isSigningOut: false,
    isUpdatingProfile: false,
    isAuthError: false,
    isFetchingUser: false,
    isCheckingAuth: true,

    checkAuth:async()=>{

        try {
            const res = await axiosInstant.get("/auth/check");

            set({authUser:res.data})
        } catch (error) {
            console.log("Error in CheckAuth", error);
            
            set({authUser:null})
            
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data)=>{
        
    }

}))