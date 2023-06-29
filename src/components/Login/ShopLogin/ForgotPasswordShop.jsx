
import React from "react"
import { useState, useContext } from "react"
import validator from 'validator'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import {app} from "../../../config/firebaseConfig"
import { NotificationContext } from "../../../context/NotificationProvider"
import accountApi from "../../../api/accountApi"


function ForgotPasswordShop({ setIsSignIn, phoneNumberRegister, setPhoneNumberRegister, passwordRegister, setPasswordRegister, setIsForgotPassword }) {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [otp, setOtp] = useState("");
    const [isVerifyState, setIsVerifyState] = useState(false)
    const [isValidOtp, setIsValidOtp] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatchPassword, setIsMatchPassword] = useState(true);

    const auth = getAuth(app);

    const formatPhoneNumber = (number) => {

        if (phoneNumberRegister.startsWith("0")) {
            number = "+84" + number.substr(1);
        }
        return number;
    }

    const verifyRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                verifyPhone();
            }
        }, auth);
    }

    const verifyPhone = () => {
        verifyRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, formatPhoneNumber(phoneNumberRegister), appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                openNotificationWithIcon("Send OTP successfully", "Please check your message !")
            }).catch((error) => {
                // Error; SMS not sent
                
            });
    }

    const checkOtp = () => {

        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            openNotificationWithIcon("OTP valid", "Valid!")
            setIsVerified(true);

        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            openNotificationWithIcon("OTP invalid", "Error! Please check OTP again!")
            setIsValidOtp(false);
        });
    }

    const validationPhoneNumber = () => {
        const isValid = validator.isMobilePhone(phoneNumberRegister, 'vi-VN')
        setIsValidPhoneNumber(isValid);
        return isValid;
    }

    const validationPassword = () => {
        const isValid = validator.isStrongPassword(passwordRegister);
        setIsValidPassword(isValid);
        return isValid;
    }


    const onSignUp = () => {
        if (validationPhoneNumber()) {
            accountApi.checkPhoneExist({ phoneNumber: phoneNumberRegister })
                .then(res => {
                    if (res.data) {
                        setIsVerifyState(true);
                        verifyPhone();
                    } else {
                        openNotificationWithIcon("Phone Number not found!", "Please try again!")
                    }
                })
        } else {
            console.log("Invalid")
        }

    }

    const isPasswordMatch = () => {
        if (passwordRegister === confirmPassword) {
            setIsMatchPassword(true);
        } else {
            setIsMatchPassword(false);
        }
    }

    const onSubmitPassord = () => {
        if (validationPassword()) {
            isPasswordMatch();
            if (isMatchPassword) {
                accountApi.updatePassword({ phoneNumber: phoneNumberRegister, password: passwordRegister })
                    .then(res => {
                        if (res.data) {
                            openNotificationWithIcon("Update password successfully!", "Please login again!")
                            setIsSignIn(true)
                            setIsForgotPassword(false)
                        } else {
                            openNotificationWithIcon("Update password fail!", "Please try again!")
                        }
                    })
            }
        }
    }

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
    }


    return (
        <div className="lg:w-1/2 sm:w-full p-5 sm:mx-auto">
            <form className="lg:w-2/3 sm:w-full bg-white p-10 rounded-md">
                {!isVerified ?
                    <>
                        {isVerifyState ? "" :
                            <div>
                                <h1 className="text-3xl mb-4">
                                    Forgot Password
                                </h1>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Phone number"
                                        className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                        onChange={(e) => setPhoneNumberRegister(e.target.value)}
                                    />
                                    {isValidPhoneNumber ? "" : <div className="text-rose-600">Invalid Phone Number !</div>}
                                </div>
                                <button
                                    className="bg-orange-400	w-full my-2 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:outline outline-1 focus:outline-none focus:bg-blue-600"
                                    onClick={(e) => {
                                        handleEntailmentRequest(e);
                                        onSignUp();
                                    }}
                                >
                                    Submit
                                </button>

                                <div>
                                    <p className="text-center mt-4">
                                        Have account already?{" "}
                                        <a
                                            className="cursor-pointer text-orange-400 hover:text-orange-700"
                                            onClick={() => {
                                                setIsSignIn(true)
                                                setIsForgotPassword(false)
                                            }}
                                        >
                                            Sign In
                                        </a>
                                    </p>
                                </div>
                            </div>}

                        {/* Verify OTP state */}

                        {!isVerifyState ? "" :
                            <div>
                                <h1 className="text-2xl mb-4">
                                    Verify Phone Number
                                </h1>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="OTP"
                                        className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    {isValidOtp ? "" : <div className="text-rose-600">Invalid OTP !</div>}
                                </div>
                                <button
                                    className="bg-orange-400	w-full my-2 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:outline outline-1 focus:outline-none focus:bg-blue-600"
                                    onClick={(e) => {
                                        handleEntailmentRequest(e);
                                        checkOtp();
                                    }
                                    }
                                >
                                    Verify
                                </button>
                            </div>}
                    </>
                    :
                    <div>
                        <h1 className="text-2xl mb-4">
                            New Password
                        </h1>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => setPasswordRegister(e.target.value)}
                            />
                            {isValidPassword ? "" : <div className="text-rose-600">Invalid Password !</div>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Password"
                                className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {isMatchPassword ? "" : <div className="text-rose-600">Password doesn't match !</div>}
                        </div>
                        <button
                            className="bg-orange-400	w-full my-2 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:outline outline-1 focus:outline-none focus:bg-blue-600"
                            onClick={(e) => {
                                handleEntailmentRequest(e);
                                onSubmitPassord();
                            }
                            }
                        >
                            Verify
                        </button>
                    </div>
                }



            </form>
            <div id="recaptcha-container"></div>
        </div>

    )
}

export default ForgotPasswordShop;