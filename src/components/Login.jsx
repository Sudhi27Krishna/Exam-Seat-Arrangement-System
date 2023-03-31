import React from "react";

function Login() {
    return (<div className="flex items-center justify-center h-screen bg-background">
        <div className="py-12 px-12 shadow-2xl w-[23rem] bg-green-login rounded-[20px]">
            <h1 className="text-3xl text-center  mb-10 font-OM">LOG IN</h1>
            <form className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-OL mb-2 " for="username">Username</label>
                    <input
                        className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-green-light focus:ring focus:ring-green-light focus:ring-opacity-50"
                        id="username" type="text" placeholder="Enter your username" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-OL mb-2" for="password">Password</label>
                    <input
                        className="block w-full h-12 px-3 py-2 rounded-[10px] shadow-sm border-gray-300 focus:outline-none focus:border-green-light focus:ring focus:ring-green-light focus:ring-opacity-50"
                        id="password" type="password" placeholder="Enter your password" required />
                </div>
                <div className="flex justify-between items-center pt-5 pb-0">
                    <a className="text-green-light text-opacity-75 hover:text-green-dark font-OR" href="/">Forgot password?</a>
                    <button
                        className="bg-green-medium hover:bg-green-light text-white font-OM py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>);
}

export default Login;