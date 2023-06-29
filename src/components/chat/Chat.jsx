import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = ({ setIsChatOpen }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.fullName}</span>
        <div className="chatIcons">
          <CloseOutlined onClick={() => setIsChatOpen(false)}/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
