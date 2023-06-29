import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"
import { LoginProvider } from "./context/LoginProvider"
import { NotificationProvider } from "./context/NotificationProvider"
import { ChatContextProvider } from "./context/ChatContext"
import { AuthContextProvider } from "./context/AuthContext"
import { SelectionChatContextProvider } from "./context/SelectionChatContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AuthContextProvider>
        <ChatContextProvider>
          <SelectionChatContextProvider >
            <LoginProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </LoginProvider>
          </SelectionChatContextProvider >
        </ChatContextProvider>
      </AuthContextProvider>
    </PersistGate>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
