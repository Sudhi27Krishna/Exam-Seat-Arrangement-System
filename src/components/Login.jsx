import { useRef } from "react";
import { Link } from 'react-router-dom';
import axios from './api/axios';

export default function Login() {
    const userRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { user: userRef.current.value, pwd: passRef.current.value };
        try {
            const response = await axios.post('/auth', newUser, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response?.data);
            console.log(response?.accessToken);
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 409) {
                console.log('Username Taken');
            } else {
                console.log('Registration Failed')
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="py-12 px-12 shadow-2xl w-[23rem] bg-green-login rounded-[20px]">
                <h1 className="text-3xl text-center font-normal mb-10 font-Outfit-Medium">LOG IN</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-Outfit-Light mb-2 " htmlFor="username">Username</label>
                        <input ref={userRef}
                            className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            id="username" type="text" placeholder="Enter your username" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-Outfit-Light mb-2" htmlFor="password">Password</label>
                        <input ref={passRef}
                            className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            id="password" type="password" placeholder="Enter your password" required />
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
    );
}