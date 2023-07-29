import { createContext, useState, useContext } from "react";
import {
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { db } from "../config/firebaseConfig";

export const SelectionChatContext = createContext();

export const SelectionChatContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { dispatch, setIsChatOpen } = useContext(ChatContext);

    const handleSelect = async () => {
        let userChat;
        userChat = user;
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.phoneNumber > userChat.phoneNumber
                ? currentUser.phoneNumber + userChat.phoneNumber
                : userChat.phoneNumber + currentUser.phoneNumber;
        console.log("handelSelect " + combinedId);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.phoneNumber), {
                    [combinedId + ".userInfo"]: {
                        phoneNumber: userChat.phoneNumber,
                        fullName: userChat.fullName,
                        avatarUrl: userChat.avatarUrl,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.phoneNumber), {
                    [combinedId + ".userInfo"]: {
                        phoneNumber: currentUser.phoneNumber,
                        fullName: currentUser.fullName,
                        avatarUrl: currentUser.avatarUrl,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
            setIsChatOpen(true);
            dispatch({ type: "CHANGE_USER", payload: userChat });
        } catch (err) { }

    };
    return (
        <SelectionChatContext.Provider value={{ user, setUser, handleSelect }}>
            {children}
        </SelectionChatContext.Provider>
    );
};
