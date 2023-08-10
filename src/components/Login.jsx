import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { faExclamationCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const LOGIN_URL = '/auth';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/home';
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const [showPwd, setShowPwd] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const toggleShowPwd = () => {
        setShowPwd(!showPwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <div className="flex flex-row items-center justify-between h-screen bg-login-signup">
            <div>
                <h1>.</h1>
            </div>
            <div className="flex flex-col items-center justify-between h-screen w-[25rem] px-14 bg-[#D9D9D9]">
                <div className="flex flex-col items-center justify-center h-screen w-full">
                    <h1 className="text-3xl text-center text-green-medium tracking-wide font-normal mb-10 font-Outfit-Medium">LOG IN</h1>
                    <div className={errMsg ? "flex flex-rows items-center p-2 h-10 w-full border border-red-600 rounded-[10px] bg-red-200 text-red-600  mb-2" : "h-0 w-0 absolute left-[-9999px]"}>
                        <FontAwesomeIcon icon={faExclamationCircle} className="h-4 p-2" />
                        <p ref={errRef} className="font-Outfit-Regular text-sm pl-1" aria-live="assertive">{errMsg}</p>
                    </div>
                    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-green-medium tracking-wide font-Outfit-Light select-none" htmlFor="username">Username</label>
                            <input
                                className="mt-2 w-full h-12 px-3 py-2 rounded-[10px] shadow-sm focus:outline-none focus:ring focus:ring-black focus:ring-opacity-40"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                placeholder="Enter your username"
                                spellcheck="false" />
                        </div>
                        <div>
                            <label className=" text-green-medium tracking-wide font-Outfit-Light select-none" htmlFor="password">Password</label>
                            <div className={`mt-2 flex flex-row items-center w-full h-12 rounded-[10px] shadow-sm ${pwdFocus ? "ring ring-black ring-opacity-40" : ""}`}>
                                <input
                                    className="h-12 w-full px-3 py-2 rounded-l-[10px] outline-none"
                                    type={showPwd ? 'text' : 'password'}
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    value={pwd}
                                    required
                                    placeholder="Enter your password" />
                                <div className="flex bg-white w-10 h-12 rounded-r-[10px] items-center justify-center">
                                    <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} className="text-gray-400 cursor-pointer border-gray-300" onClick={toggleShowPwd} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center pt-3 ">
                            <button
                                className="border bg-green-medium tracking-wider hover:bg-opacity-25 hover:text-green-medium hover:border-green-medium  text-white font-Outfit-Bold py-3 px-7 rounded-[30px] focus:outline-none focus:shadow-outline select-none"
                                type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mb-10 gap-2 select-none">
                    <p>
                        Don't have an account?
                    </p>
                    <span className="block hover:text-blue-600">
                        <Link to="register">Sign Up</Link>
                    </span>
                </div>

            </div>
        </div>
    );
}