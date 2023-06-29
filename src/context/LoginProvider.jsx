import { createContext, useState } from "react"

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState('');
    const [shopId, setShopId] = useState('')
    

    return (
        <LoginContext.Provider value={{isLogin, setIsLogin, role, setRole, shopId, setShopId}} >
            {children}
        </LoginContext.Provider>
    )
}

export {LoginContext, LoginProvider}


