import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }),
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
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="py-12 px-12 shadow-2xl w-[23rem] bg-green-login rounded-[20px]">
                <h1 className="text-3xl text-center font-normal mb-10 font-Outfit-Medium">REGISTER</h1>
                <div className="flex items-center justify-center">
                    <p ref={errRef} className={errMsg ? "text-red-600 font-Outfit-SemiBold mb-2" : "absolute left-[-9999px]"} aria-live="assertive">{errMsg}</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-Outfit-Light mb-2 ">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "text-green-500 ml-3" : "collapse"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "collapse" : "text-red-500 "} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "text-xs rounded-lg bg-black text-white p-1 my-1 relative" : "absolute left-[-9999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-Outfit-Light mb-2 ">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500 ml-3" : "collapse"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "collapse" : "text-red-500 ml-1"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "text-xs rounded-lg bg-black text-white p-1 my-1 relative" : "absolute left-[-9999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    </div>

                    <div>
                        <label htmlFor="confirm_pwd" className="block text-gray-700 font-Outfit-Light mb-2 ">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-green-500 ml-3" : "collapse"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "collapse" : "text-red-500 ml-1"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "text-xs rounded-lg bg-black text-white p-1 my-1 relative" : "absolute left-[-9999px]"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Must match the first password input field.
                        </p>
                    </div>

                    <div className="flex items-center justify-center pt-5">
                        <button type="submit" className=" bg-green-medium hover:bg-green-light text-white font-Outfit-Bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline"
                            disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-3 gap-2">
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