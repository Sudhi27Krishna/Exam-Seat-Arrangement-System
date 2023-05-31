import { useState } from 'react';
import muthoot from '../assets/muthoot.png';
import people from '../assets/people.png';
import addroom from '../assets/addroom.png';
import calendar from '../assets/calendar.png';
import allocate from '../assets/allocate.png';

function Home() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    const isReqWidth = (windowWidth <= 1000);
    return (
        <div className="flex flex-col bg-background flex-grow md:w-5/6">

            <div className="flex-auto flex">
                <div className="bg-green-save flex-1 flex items-center px-16 py-7 drop-shadow-lg rounded-br-3xl">
                    <p className="font-Outfit-ExtraBold text-5xl text-white tracking-wide leading-snug drop-shadow-lg">Managing exams, made easier</p>
                </div>
                <div className={`bg-background flex-none flex items-center py-3 ${isReqWidth ? "px-3" : "px-16"}`}>
                    <img src={people} className={`${isReqWidth ? "h-0" : "h-36"}`} alt="sitting" />
                </div>
            </div>

            <div className="bg-background p-14 pl-16">
                <p className="font-Outfit-Medium text-xl">Maximize Efficiency, Minimize Stress: Revolutionizing Seat Allocation for a Smoother Exam Experience</p>
            </div>

            <div className={`bg-background pt-14 pb-24 ${isReqWidth ? "px-14" : " px-36"}`}>
                <div className={`flex ${isReqWidth ? "flex-row gap-10" : "flex-col"}`}>
                    <div className={`flex-none flex ${isReqWidth ? "flex-col gap-7" : "flex-row px-24"} justify-between`}>
                        <img src={addroom} className="h-16" alt="Manage Rooms" />
                        <img src={calendar} className="h-16" alt="University Exams" />
                        <img src={allocate} className="h-16" alt="Seat Allocation" />
                    </div>
                    <div className={`flex ${isReqWidth ? "flex-col py-5" : "flex-row py-1 px-28 "}`}>
                        <div className="h-3 w-3 transform rotate-45 border-2 border-green-dark">
                            <div className="w-2 h-2 rounded-full bg-green-dark"></div>
                        </div>
                        <div className={`${isReqWidth ? "mx-[5px] h-full w-0 border-r" : "my-[5px] w-full h-0 border-t"} border-dashed border-green-dark`}></div>
                        <div className="h-3 w-3 transform rotate-45 border-2 border-green-dark">
                            <div className="w-2 h-2 rounded-full bg-green-dark"></div>
                        </div>
                        <div className={`${isReqWidth ? "mx-[5px] h-full w-0 border-r" : "my-[5px] w-full h-0 border-t"} border-dashed border-green-dark`}></div>
                        <div className="h-3 w-3 transform rotate-45 border-2 border-green-dark">
                            <div className="w-2 h-2 rounded-full bg-green-dark"></div>
                        </div>
                    </div>
                    <div className={`flex ${isReqWidth ? "flex-col gap-5" : "flex-row gap-10"} justify-between font-normal font-Outfit-Light`}>
                        <p>Add or remove exam halls and the number of available seats in the <b>Manage Rooms page</b> </p>
                        <p>Update or view upcoming exam details in the <b>University Exams</b> page </p>
                        <p>Generate excel sheets with exam halls and participants details in the <b>Seat Allocation</b> page</p>
                    </div>
                </div>
            </div>

            <div className="p-3 flex flex-row justify-between items-center">
                <img src={muthoot} className="h-5 opacity-50" alt="muthoot logo" />
                <div className="flex flex-row gap-5 pr-2 font-Outfit-Light text-green-dark">
                    <p className="hover:underline cursor-pointer">About</p>
                    <p className="hover:underline cursor-pointer ">Contact</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
