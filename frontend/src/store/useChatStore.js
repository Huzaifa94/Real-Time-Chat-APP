import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstant } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set) => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUersLoading: false,
    isMessagesLoading: false,
   

    getUsers: async () => {
        set({ isUersLoading: true });
        try {
            const res = await axiosInstant.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUersLoading: false });
        }

    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstant.get(`/messages/${userId}`);
          set({ messages: res.data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },
      sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstant.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
      // subscribeToMessages: () => {
      //   const { selectedUser } = get();
      //   if (!selectedUser) return;
    
      //   const socket = useAuthStore.getState().socket;
    
      //   socket.on("newMessage", (newMessage) => {
      //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      //     if (!isMessageSentFromSelectedUser) return;
    
      //     set({
      //       messages: [...get().messages, newMessage],
      //     });
      //   });
      // },
      
      setSelectedUser: (selectedUser) => set({ selectedUser }),

})) 