import { createContext, useState } from "react"

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState('');
    

    return (
        <LoginContext.Provider value={{isLogin, setIsLogin, role, setRole}} >
            {children}
        </LoginContext.Provider>
    )
}

export {LoginContext, LoginProvider}


