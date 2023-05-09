// import AllocRow from './AllocRow';
import { useState, useRef, useEffect } from 'react';
import rooms from '../rooms';
// import row from '../row';
import SeatBox from './SeatBox';

export default function SeatAllocation() {
  const [schedules, setSchedules] = useState([]);
  const dateRef = useRef();
  const timeRef = useRef();
  const examRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width state when the window is resized
  window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  const isHalfWidth = (windowWidth <= 1384);

  const handleSchedule = (e) => {
    e.preventDefault()
    const newSchedule = { date: dateRef.current.options[dateRef.current.selectedIndex].value, time: timeRef.current.options[timeRef.current.selectedIndex].value, exam: examRef.current.options[examRef.current.selectedIndex].value };
    const allSchedules = [...schedules, newSchedule];
    setSchedules(allSchedules);
    console.log(allSchedules);
  }

  useEffect(() => {
    dateRef.current.value = 'default';
    timeRef.current.value = 'default';
    examRef.current.value = 'default';
  }, [schedules]);

  return (
    <div className="bg-background flex flex-col flex-grow md:w-3/4">
      <div className="bg-background px-8 pt-4 flex flex-col st:flex-row justify-between">
        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT DATE</span></h2>
          <select ref={dateRef} className="h-10 px-3 py-2 ml-5 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="09-09-2021">09-09-2021</option>
            <option value="09-09-2022">09-09-2022</option>
            <option value="09-09-2023">09-09-2023</option>
            <option value="09-09-2024">09-09-2024</option>
            <option value="09-09-2025">09-09-2025</option>
            <option value="09-09-2026">09-09-2026</option>
            <option value="09-09-2027">09-09-2027</option>
            <option value="09-09-2028">09-09-2028</option>
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT TIME</span></h2>
          <select ref={timeRef} className="h-10 px-3 py-2 ml-6 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="15:00:00">15:00:00</option>
            <option value="16:00:00">16:00:00</option>
            <option value="17:00:00">17:00:00</option>
            <option value="18:00:00">18:00:00</option>
            <option value="19:00:00">19:00:00</option>
            <option value="20:00:00">20:00:00</option>
            <option value="21:00:00">21:00:00</option>
            <option value="22:00:00">22:00:00</option>
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT EXAM</span></h2>
          <select ref={examRef} className="h-10 px-3 py-2 ml-4 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="FLAT">FLAT</option>
            <option value="OS">OS</option>
            <option value="SS">SS</option>
            <option value="CN">CN</option>
            <option value="CGIP">CGIP</option>
            <option value="DBMS">DBMS</option>
            <option value="OOP">OOP</option>
            <option value="DS">DS</option>
          </select>
        </div>
      </div>

      <div className="bg-background px-8 pt-4 mt-1 flex flex-col st:flex-row flex-grow justify-between">
        <div className="py-4 st:w-full">
          <h2 className="text-xl font-Outfit-Bold mb-4">SELECTED EXAM HALLS</h2>
          <div className="flex flex-row justify-between items-center bg-gray-100 px-4 py-3 border rounded-2xl mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between sm:w-1/2">
              <div className={`flex ${isHalfWidth ? "flex-col" : "flex-row"}`}>
                {/* Search Bar */}
                <div className="mr-4">
                  <label htmlFor="search" className="mr-4">Search:</label>
                  <input
                    type="text"
                    id="search"
                    className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                    placeholder="Search..."
                  />
                </div>

                {/* Sort By Dropdown */}
                <div className={`mr-4 ${isHalfWidth ? "mt-4" : ""}`}>
                  <label htmlFor="sort-by" className="mr-4">Sort By:</label>
                  <select id="sort-by" className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login">
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="date">Date</option>
                  </select>
                </div>

                {/* Filter By Dropdown */}
                <div className={`${isHalfWidth ? "mt-4" : ""}`}>
                  <label htmlFor="filter-by" className="mr-4">Filter By:</label>
                  <select id="filter-by" className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login">
                    <option value="all">All</option>
                    <option value="featured">Featured</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`flex ${isHalfWidth ? "flex-col" : "flex-row"} sm:w-1/2 sm:ml-2 w-1/2 justify-center items-center gap-x-4 mr-8 pl-4`}>
              <p className={`${isHalfWidth ? "mt-4" : ""} font-Outfit-Regular`}><span className="whitespace-nowrap">Seats Selected: 2000</span></p>
              <p className={`${isHalfWidth ? "mt-4" : ""} font-Outfit-Regular`}><span className="whitespace-nowrap">Seats Not Selected: 2000</span></p>
              <p className={`${isHalfWidth ? "mt-4" : ""} font-Outfit-Regular`}><span className="whitespace-nowrap">Seats Not Available: 2000</span></p>
            </div>
          </div>
          <div className="bg-gray-100 h-[21rem] overflow-y-scroll border rounded-2xl p-4">
            {rooms.map(item => <SeatBox key={item.id} room={item.room} capacity={item.capacity} />)}
          </div>
        </div>
      </div>

      <div className="px-8 py-4 my-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-Outfit-Regular">Total Seats Available: 2000 (1899 Regular + 111 Supplymentary)</p>
          </div>
          <div className="flex flex-row gap-10">
            <button className="bg-green-500 hover:bg-green-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button" onClick={handleSchedule}>SAVE</button>
            <button className="bg-green-medium hover:bg-green-light text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button">PROCEED</button>
          </div>
        </div>
      </div>
    </div >
  );
}
