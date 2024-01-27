import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../config/firebaseConfig";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.phoneNumber), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.phoneNumber && getChats();
  }, [currentUser.phoneNumber]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <div className="avatar">
            <img className="w-full h-full" src={chat[1].userInfo.avatarUrl ? chat[1].userInfo.avatarUrl : ""} alt="" />
          </div>

          <div className="userChatInfo">
            <span>{chat[1].userInfo.fullName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
