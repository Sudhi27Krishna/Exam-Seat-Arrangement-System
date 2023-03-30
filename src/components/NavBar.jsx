import React from 'react'

function NavBar() {
    return (
        <div class="flex flex-col w-64 h-screen bg-green-medium">
            <div class="flex flex-col items-center justify-center h-64">
                <img src="https://variety.com/wp-content/uploads/2023/03/john-wick-chapter-4-keanu.jpg?w=681&h=383&crop=1" alt="john-wick" class="rounded-full w-20 h-20" />
                <p className="text-white font-Outfit-Medium tracking-needed mt-4">JOHN WICK</p>
            </div>
            <div class="flex flex-col items-start justify-start h-full py-5">
                <a href="/" class="font-Outfit-Medium tracking-needed text-white hover:bg-green-light  py-2 px-6 w-full">
                    Home
                </a>
                <a href="/" class="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Manage Rooms
                </a>
                <a href="/" class="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    University Exams
                </a>
                <a href="/" class="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Seat Arrangement
                </a>
                <div class="flex-grow"></div> {/*adds a spacer to push logout to the bottom*/}
                <a href="/" class="font-Outfit-Medium tracking-needed text-white hover:bg-green-light py-2 px-6 w-full">
                    Log Out
                </a>
            </div>
        </div>
    );
}

export default NavBar;
