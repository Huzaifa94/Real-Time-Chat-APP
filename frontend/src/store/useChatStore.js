import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "./lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUersLoading: false,
    isMessagesLoading: false,
   

    getUsers: async () => {
        set({ isUersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUersLoading: false });
        }

    }
})) 