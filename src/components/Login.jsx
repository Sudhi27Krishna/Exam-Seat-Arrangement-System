import { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate, useLocation } from 'react-router-dom';
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const LOGIN_URL = '/auth';

export default function Login() {
    const location = useLocation();
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

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
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
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
        <>
            {success ? (
                <Navigate to='/home' state={{ from: location }} replace />
            ) : (
                <div className="flex items-center justify-center h-screen bg-background">
                    <div className="py-12 px-12 shadow-2xl w-[23rem] bg-green-login rounded-[20px]">
                        <h1 className="text-3xl text-center font-normal mb-10 font-Outfit-Medium">LOG IN</h1>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 font-Outfit-Light mb-2 " htmlFor="username">Username</label>
                                <input
                                    className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    placeholder="Enter your username" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-Outfit-Light mb-2" htmlFor="password">Password</label>
                                <input
                                    className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    placeholder="Enter your password" />
                            </div>
                            <div className="flex justify-center items-center pt-5 ">
                                <button
                                    className="bg-green-medium hover:bg-green-light text-white font-Outfit-Bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3 gap-2">
                            <p>
                                Don't have an account?
                            </p>
                            <span className="block hover:text-blue-600">
                                <Link to="register">Sign Up</Link>
                            </span>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}