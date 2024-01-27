import { createContext, useEffect, useState } from "react";
import storageService from "../api/storage";
import jwtDecode from "jwt-decode";
import userApi from "../api/userApi";
import shopApi from "../api/shopApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        let token = storageService.getAccessToken();
        if (token) {
            token = jwtDecode(token);
            if (token.role === 'SHOP') {
                shopApi.getShopInformationByPhoneNumber(token.sub).then((res) => {
                    setCurrentUser({
                        phoneNumber: token.sub,
                        shopName: res.data.shopName,
                        avatarUrl: res.data.avatarUrl,
                    });
                }).catch((err) => {
                    console.log(err);
                }
                );
            } else {
                userApi.getUserByPhoneNumber(token.sub).then((res) => {
                    setCurrentUser({
                        phoneNumber: token.sub,
                        fullName: res.data.fullName,
                        avatarUrl: res.data.avatarUrl,
                    });
                }).catch((err) => {
                    console.log(err);
                }
                );
            }

        }

        // return () => {
        //     unsub();
        // };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
