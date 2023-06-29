import {
  createContext,
  useContext,
  useReducer,
  useState
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.phoneNumber > action.payload.phoneNumber
              ? currentUser.phoneNumber + action.payload.phoneNumber
              : action.payload.phoneNumber + currentUser.phoneNumber,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch, setIsChatOpen, isChatOpen }}>
      {children}
    </ChatContext.Provider>
  );
};
