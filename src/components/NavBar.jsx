import React from 'react'

function NavBar() {
    return (
        <div className="flex flex-col w-64 min-h-screen bg-green-medium">
            <div className="flex flex-col items-center justify-center h-64">
                <img src="https://variety.com/wp-content/uploads/2023/03/john-wick-chapter-4-keanu.jpg?w=681&h=383&crop=1" alt="john-wick" className="rounded-full w-20 h-20" />
                <p className="text-white font-Outfit-Medium tracking-needed mt-4">JOHN WICK</p>
            </div>
            <div className="flex flex-col items-start justify-start h-full py-5">
                <a href="/" className="font-Outfit-Medium tracking-needed text-white hover:bg-green-light  py-2 px-6 w-full">
                    Home
                </a>
                <a href="/" className="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Manage Rooms
                </a>
                <a href="/" className="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    University Exams
                </a>
                <a href="/" className="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Seat Arrangement
                </a>
                <div className="flex-grow"></div> {/*adds a spacer to push logout to the bottom*/}
                <a href="/" className="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Log Out
                </a>
            </div>
        </div>
    );
}

export default NavBar;
