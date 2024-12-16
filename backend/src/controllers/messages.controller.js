import User from "../models/user.modal.js";
import Messages from "../models/messages.modal.js";
export const getUsersForSidebar = async (req,res)=>{

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({__id:{$in:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        
        console.error("Error in getUsersForSideBar",error);
        res.status(500).json({error: "Server Error"});
    }

};

export const getMessages = async (req, res)=>{

    try {
        
        const  {id:userToChatId} = req.params
        const senderId = req.user._id;

        const messages = await Messages.find({
            $or:[
                {sender:senderId, receiver:userToChatId},
                {sender:userToChatId, receiver:senderId},
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        
        console.log("Error in getting messages",error.messages);
        res.status(500).json({error: "internal Server Error"});
        
    }
}

export const sendMessages = async (req,res) =>{

        try {
            
            const {text,image} = req.body;
            const {id:receiverId} = req.params;
            const senderId = req.user._id;

            let imageUrl;
            if(image){
                
                const uploadResonse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResonse.secure_url;
            }

            const newMessage = new Messages({
                senderId,
                receiverId,
                text,
                imageUrl


            })

            await newMessage.save();
            res.status(201).json(newMessage);


        } catch (error) {
            
            console.error("Error in sending messages",error.message);
            res.status(500).json({error: "internal Server Error"});
            
        }

}