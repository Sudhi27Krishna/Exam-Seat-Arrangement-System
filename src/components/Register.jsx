import { useRef, useState, useEffect } from "react";
import { faInfoCircle, faExclamationCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^[A-Za-z0-9]+@mgits\.ac\.in$/;
const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const emailRef = useRef();
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidMail(MAIL_REGEX.test(mail));
    }, [mail])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const toggleShowPwd = () => {
        setShowPwd(!showPwd);
    };

    const toggleShowConfirmPwd = () => {
        setShowConfirmPwd(!showConfirmPwd);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validPwd || !validMail || !validMatch) {
            setErrMsg("Invalid Entry");
            return;
        }
        const email = emailRef.current.value;
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            navigate('/');
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already taken');
            } else {
                setErrMsg('Registration failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="flex flex-row items-center justify-between h-screen bg-login-signup">
            <div>
                <h1>.</h1>
            </div>
            <div className="flex flex-col items-center justify-center h-screen w-[25rem] px-14 bg-[#D9D9D9]">
                <div className="flex flex-col items-center justify-center h-screen w-full">
                    <h1 className="text-3xl text-center text-green-medium tracking-wide font-normal mb-10 font-Outfit-Medium">REGISTER</h1>
                    <div className={errMsg ? "flex flex-row items-center p-2 h-10 w-full border border-red-600 rounded-[10px] bg-red-200 text-red-600  mb-2" : "h-0 w-0 absolute left-[-9999px]"}>
                        <FontAwesomeIcon icon={faExclamationCircle} className="h-4 p-2" />
                        <p ref={errRef} className="font-Outfit-Regular text-sm pl-1" aria-live="assertive">{errMsg}</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-3 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-green-medium tracking-wide font-Outfit-Light mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                spellCheck="false"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder="Enter your username"
                                className={`w-full h-12 px-3 py-2 rounded-[10px] shadow-sm focus:outline-none focus:ring 
                            ${validName ? "border-2 border-green-500 focus:border focus:ring-green-500 focus:ring-opacity-50" : "focus:ring-black focus:ring-opacity-40"} 
                            ${!validName && user ? "border-2 border-red-500 focus:border focus:border-red-500 focus:ring-red-500 focus:ring-opacity-70" : ""}`}
                            />
                            <div id="uidnote" className={userFocus && user && !validName ? "flex flex-row w-full text-xs rounded-lg bg-red-200 text-red-600 p-1 mt-[5px]" : "absolute left-[-9999px]"}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 pl-1 pt-[2px] text-red-600" />
                                <p>
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-green-medium tracking-wide font-Outfit-Light mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                spellCheck="false"
                                onChange={(e) => setMail(e.target.value)}
                                value={mail}
                                aria-invalid={validMail ? "false" : "true"}
                                aria-describedby="mailnote"
                                onFocus={() => setMailFocus(true)}
                                onBlur={() => setMailFocus(false)}
                                placeholder="Enter your email"
                                className={`w-full h-12 px-3 py-2 rounded-[10px] shadow-sm focus:outline-none focus:ring 
                            ${validMail ? "border-2 border-green-500 focus:border focus:ring-green-500 focus:ring-opacity-50" : "focus:ring-black focus:ring-opacity-40"} 
                            ${!validMail && mail ? "border-2 border-red-500 focus:border focus:border-red-500 focus:ring-red-500 focus:ring-opacity-70" : ""}`}

                            />
                            <p id="mailnote" className={mailFocus && mail && !validMail ? "text-xs rounded-lg bg-red-200 text-red-600 p-1 mt-[5px] " : "absolute left-[-9999px]"}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-600" />
                                Use mgits mail id.(lowercase)
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-green-medium tracking-wide font-Outfit-Light mb-2">
                                Password
                            </label>
                            <div className={`flex flex-row items-center w-full h-12 rounded-[10px] shadow-sm ${pwdFocus && !pwd ? "ring ring-black ring-opacity-40" : ""} 
                        ${pwdFocus && validPwd ? "ring ring-green-500 ring-opacity-50" : ""} ${pwdFocus && !validPwd && pwd ? "ring ring-red-500 ring-opacity-70" : ""}`}>
                                <input
                                    className={`h-12 w-full px-3 py-2 rounded-l-[10px] outline-none ${!pwdFocus && validPwd ? "border-y-2 border-l-2 border-green-500 " : ""} 
                                ${!pwdFocus && !validPwd && pwd ? "border-y-2 border-l-2 border-red-500" : ""}`}
                                    type={showPwd ? 'text' : 'password'}
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    placeholder="Enter your password"
                                />
                                <div className={`flex bg-white w-10 h-12 rounded-r-[10px] items-center justify-center ${!pwdFocus && validPwd ? "border-y-2 border-r-2 border-green-500" : ""} 
                            ${!pwdFocus && !validPwd && pwd ? "border-y-2 border-r-2 border-red-500" : ""}`}>
                                    <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} className="text-gray-400 cursor-pointer border-gray-300" onClick={toggleShowPwd} />
                                </div>
                            </div>
                            <div id="pwdnote" className={pwdFocus && !validPwd ? "flex flex-row text-xs rounded-lg bg-red-200 text-red-600 p-1 mt-[5px]" : "absolute left-[-9999px]"}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 pl-1 pt-[2px] text-red-600" />
                                <p>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="confirm_pwd" className="text-green-medium tracking-wide font-Outfit-Light mb-2">
                                Confirm Password
                            </label>
                            <div className={`flex flex-row items-center w-full h-12 rounded-[10px] shadow-sm ${matchFocus && !matchPwd ? "ring ring-black ring-opacity-40" : ""} 
                        ${matchFocus && validMatch && matchPwd ? "ring ring-green-500 ring-opacity-50" : ""} ${matchFocus && !validMatch && matchPwd ? "ring ring-red-500 ring-opacity-70 " : ""}`}>
                                <input
                                    className={`h-12 w-full px-3 py-2 rounded-l-[10px] outline-none ${!matchFocus && validMatch && matchPwd ? "border-y-2 border-l-2 border-green-500" : ""} 
                                ${!matchFocus && !validMatch && matchPwd ? "border-y-2 border-l-2 border-red-500" : ""}`}
                                    type={showConfirmPwd ? 'text' : 'password'}
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    placeholder="Re-enter your password"
                                />
                                <div className={`flex bg-white w-10 h-12 rounded-r-[10px] items-center justify-center ${!matchFocus && validMatch && matchPwd ? "border-y-2 border-r-2 border-green-500" : ""} 
                            ${!matchFocus && !validMatch && matchPwd ? "border-y-2 border-r-2 border-red-500" : ""}`}>
                                    <FontAwesomeIcon icon={showConfirmPwd ? faEyeSlash : faEye} className="text-gray-400 cursor-pointer border-gray-300" onClick={toggleShowConfirmPwd} />
                                </div>
                            </div>
                            <p id="confirmnote" className={matchFocus && !validMatch ? "text-xs rounded-lg bg-red-200 text-red-600 p-1 mt-[5px]" : "absolute left-[-9999px]"}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-600" />
                                Must match the first password input field.
                            </p>
                        </div>

                        <div className="flex items-center justify-center pt-5">
                            <button type="submit"
                                className="border bg-green-medium tracking-wider hover:bg-opacity-25 hover:text-green-medium hover:border-green-medium  text-white font-Outfit-Bold py-3 px-7 rounded-[30px] focus:outline-none focus:shadow-outline select-none"
                            >Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mb-10 gap-2">
                    <p>
                        Don't have an account?
                    </p>
                    <span className="block hover:text-blue-600">
                        <Link to="/">Sign In</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;