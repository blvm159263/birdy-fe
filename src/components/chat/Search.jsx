// import React, { useContext, useState } from "react";
// import {
//     setDoc,
//     doc,
//     updateDoc,
//     serverTimestamp,
//     getDoc,
// } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";
// import { AuthContext } from "../../context/AuthContext";
// import userApi from "../../api/userApi";
// import { SelectionChatContext } from "../../context/SelectionChatContext";
// const Search = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [err, setErr] = useState(false);

//     const { currentUser } = useContext(AuthContext);
//     const {user, setUser, handleSelect} = useContext(SelectionChatContext);

//     const handleSearch = async () => {

//         await userApi.getUserByPhoneNumber(phoneNumber).then((res) => {
//             setUser({
//                 phoneNumber: phoneNumber,
//                 fullName: res.data.fullName,
//                 avatarUrl: res.data.avatarUrl,
//             });
//         }
//         ).catch((err) => {
//             setErr(true);
//         }
//         );

//     };

//     const handleKey = (e) => {
//         e.code === "Enter" && handleSearch();
//     };

 
//     return (
//         <div className="search">
//             <div className="searchForm">
//                 <input
//                     type="text"
//                     placeholder="Find a user"
//                     onKeyDown={handleKey}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     value={phoneNumber}
//                 />
//             </div>
//             {err && <span>User not found!</span>}
//             {user && (
//                 <div className="userChat" onClick={handleSelect}>
//                     <img src={user.avatarUrl} alt="" />
//                     <div className="userChatInfo">
//                         <span>{user.fullName}</span>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Search;
