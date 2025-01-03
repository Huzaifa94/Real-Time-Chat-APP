import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isSigningOut: false,
  isUpdatingProfile: false,
  isAuthError: false,
  isFetchingUser: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstant.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in CheckAuth", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstant.post("/auth/signup", data);
      toast.success("Account Created Successfully");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isAuthError: true });
    } finally {
      set({ isSigningUp: false });
    }
  },
  signin: async () => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstant.post("/auth/signin");
      toast.success("Logged In Successfully");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isAuthError: true });
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    set({ isSigningOut: true });
    try {
      await axiosInstant.post("/auth/signout");
      toast.success("Logged Out Successfully");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in Logout", error);
    } finally {
      set({ isSigningOut: false });
    }
  },
    updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      await axiosInstant.put("/auth/update-profile", data);
      set({authUser:res.data})
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error updating profile", error);
      
    } finally {
      set({ isUpdatingProfile: false });
    }
  }

}));
