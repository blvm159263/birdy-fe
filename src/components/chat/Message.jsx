import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { formatRelative } from "date-fns/esm";

const Message = ({ message }) => {
  console.log(message);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatDate = (seconds) => {
    let formattedDate = "";
    if(seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.phoneNumber && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.phoneNumber
              ? currentUser.avatarUrl
              : data.user.avatarUrl
          }
          alt=""
        />
        
      </div>
      <div className="messageContent">
      
        <p>{message.text}</p>
        <span>{formatDate(message.date.seconds)}</span>
      </div>
    </div>
  );
};

export default Message;
